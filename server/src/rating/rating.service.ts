import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Between, In, IsNull, Not, Repository } from 'typeorm';
import * as moment from 'moment';
import { RatingEntity } from './rating.entity';
import { AddRatingColumnDto } from './dto/add-rating-column.dto';
import { EducationEntity } from '../education/education.entity';
import { UpdateDateRatingColumnDto } from './dto/update-date-rating-column.dto';
import { UpdateDescriptionRatingColumnDto } from './dto/update-description-rating-column.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
	constructor(
		@InjectRepository(RatingEntity)
		private readonly ratingRepository: Repository<RatingEntity>,
		@InjectRepository(EducationEntity)
		private readonly educationRepository: Repository<EducationEntity>
	) {}

	async getRating(
		teacherId: string,
		educationId: string,
		dateStartRating?: Date,
		dateEndRating?: Date
	) {
		const { dateStart, dateEnd } = this.getDateRange(dateStartRating, dateEndRating);

		const education = await this.educationRepository.findOne({
			where: [
				{
					id: educationId,
					teacher: { id: teacherId },
					// ratings: { date: Between(dateStart, dateEnd) }
				}
			],
			relations: {
				cls: {
					students: {
						ratings: { education: true }
					}
				},
				subject: true,
				ratings: {
					student: { cls: true },
					education: true
				}
			},
			order: {
				cls: {
					students: {
						firstName: 'ASC',
						lastName: 'ASC',
						patronymic: 'ASC'
					}
				}
			}
		});

		if (!education) {
			throw new NotFoundException();
		}

		if (!education.cls) {
			return education;
		}

		education.ratings = education.ratings
			.filter((rating) => new Date(rating.date) >= dateStart && new Date(rating.date) <= dateEnd &&
				education.cls?.id === rating.student.cls?.id);

		const missedRating: RatingEntity[] = [];

		for (const rating of education.ratings) {
			for (const student of education.cls.students) {
				if (
					// перевірка чи в кожного учня є всі комірки для оцінок
					!student.ratings.some((r) => r.education?.id === rating.education?.id &&
						r.date === rating.date) &&
					!missedRating.some((r) => r.education?.id === rating.education?.id &&
						r.date === rating.date && r.student.id === student.id)
				) {
					const tempRating = this.ratingRepository.create({
						education,
						student,
						date: rating.date,
						description: rating.description
					});

					education.ratings.push(tempRating);
					missedRating.push(tempRating);
				}
			}
		}

		await this.ratingRepository.save(missedRating);

		education.ratings.sort(this.sortRatingsByDate);

		return {
			education,
			dateStartRating: dateStart,
			dateEndRating: dateEnd
		};
	}

	async updateRating(teacherId: string, dto: UpdateRatingDto) {
		const rating = await this.ratingRepository.findOne({
			where: {
				id: dto.id,
				education: {
					teacher: { id: teacherId }
				}
			}
		});

		if (!rating) {
			throw new NotFoundException(`Запису про оцінку з id ${dto.id} не існує або у вас немає доступу`);
		}

		if (!dto.isPresence) {
			rating.isPresence = false;
			rating.mark = null;
		} else {
			rating.isPresence = dto.isPresence;
			rating.mark = dto.mark;
		}

		await this.ratingRepository.save(rating);
	}

	async addRatingColumn(teacherId: string, dto: AddRatingColumnDto) {
		const education = await this.educationRepository.findOne({
			where: {
				id: dto.educationId,
				teacher: { id: teacherId }
			},
			relations: {
				cls: {
					students: true
				}
			}
		});

		if (!education) {
			throw new NotFoundException(`Запису про викладання предмету з id ${dto.educationId} не існує`);
		}

		if (!education.cls) {
			throw new NotFoundException(`Запис про викладання предмету з id ${dto.educationId} не містить клас з учнями`);
		}

		if (await this.ratingRepository.exist({
			where: {
				date: dto.date,
				education: {
					id: dto.educationId,
					teacher: { id: teacherId }
				},
				student: { id: In(dto.studentIds) }
			}
		})) {
			throw new BadRequestException(`Колонка з датою ${moment(dto.date).format('DD.MM.YYYY')}, уже існує`);
		}

		const ratingColumn: RatingEntity[] = [];

		education.cls.students.forEach((student) => {
			ratingColumn.push(this.ratingRepository.create({
				education,
				student,
				date: dto.date
			}));
		});

		await this.ratingRepository.save(ratingColumn);
	}

	async removeRatingColumn(teacherId: string, ids: string[]) {
		const ratingsToDelete = await this.ratingRepository.find({
			where: {
				id: In(ids),
				education: {
					teacher: { id: teacherId }
				}
			}
		});

		await this.ratingRepository.remove(ratingsToDelete);
	}

	async updateDateRatingColumn(teacherId: string, dto: UpdateDateRatingColumnDto) {
		if (await this.ratingRepository.exist({
			where: {
				date: dto.date,
				education: {
					teacher: { id: teacherId }
				},
				student: { id: In(dto.studentIds) }
			}
		})) {
			throw new BadRequestException(`Колонка з датою ${moment(dto.date).format('DD.MM.YYYY')}, уже існує`);
		}

		const ratingsToUpdate = await this.ratingRepository.find({
			where: {
				id: In(dto.ratingIds),
				education: {
					teacher: { id: teacherId }
				}
			}
		});

		ratingsToUpdate.map((rating) => rating.date = dto.date);

		await this.ratingRepository.save(ratingsToUpdate);
	}

	async updateDescriptionRatingColumn(teacherId: string, dto: UpdateDescriptionRatingColumnDto) {
		const ratingsToUpdate = await this.ratingRepository.find({
			where: {
				id: In(dto.ratingIds),
				education: {
					teacher: { id: teacherId }
				}
			}
		});

		ratingsToUpdate.map((rating) => rating.description = dto.description ? dto.description : null);

		await this.ratingRepository.save(ratingsToUpdate);
	}

	async getDistinctDescriptions(): Promise<string[]> {
		const descriptions = await this.ratingRepository
			.createQueryBuilder('rating')
			.select('DISTINCT rating.description')
			.where('rating.description IS NOT NULL')
			.execute();

		return descriptions.map(({ description }) => description);
	}

	getDateRange(dateStart?: Date, dateEnd?: Date) {
		dateStart = dateStart ? new Date(dateStart) : dateStart;
		dateEnd = dateEnd ? new Date(dateEnd) : dateEnd;

		if (!dateEnd) {
			const now = new Date();
			dateEnd = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0, 0, 0));
		}

		if (!dateStart || dateStart >= dateEnd) {
			if (dateEnd.getMonth() >= 8) {
				// початок першого семестру
				dateStart = new Date(Date.UTC(dateEnd.getFullYear(), 8, 1, 0, 0, 0, 0));
			} else {
				// початок другого семестру
				dateStart = new Date(Date.UTC(dateEnd.getFullYear(), 0, 1, 0, 0, 0, 0));
			}
		}

		return { dateStart, dateEnd };
	}

	sortRatingsByDate(r1: RatingEntity, r2: RatingEntity) {
		return new Date(r1.date).getTime() - new Date(r2.date).getTime();
	}
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as moment from 'moment';
import { RatingEntity } from './rating.entity';
import { AddRatingColumnDto } from './dto/add-rating-column.dto';
import { EducationEntity } from '../education/education.entity';
import { UpdateDateRatingColumnDto } from './dto/update-date-rating-column.dto';
import { UpdateDescriptionRatingColumnDto } from './dto/update-description-rating-column.dto';

@Injectable()
export class RatingService {
	constructor(
		@InjectRepository(RatingEntity)
		private readonly ratingRepository: Repository<RatingEntity>,
		@InjectRepository(EducationEntity)
		private readonly educationRepository: Repository<EducationEntity>
	) {}

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
				}
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
				}
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
			.execute();

		return descriptions.map(({ description }) => description).filter(value => value !== null);
	}
}

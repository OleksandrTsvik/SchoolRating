import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from './education.entity';
import { EducationDto } from './dto/education.dto';

@Injectable()
export class EducationService {
	constructor(
		@InjectRepository(EducationEntity)
		private readonly educationRepository: Repository<EducationEntity>
	) {}

	async getAll(): Promise<EducationEntity[]> {
		return this.educationRepository.find({
			relations: {
				teacher: true,
				cls: true,
				subject: true
			}
		});
	}

	async findById(id: string): Promise<EducationEntity> {
		const education = await this.educationRepository.findOneBy({ id });
		if (!education) {
			throw new NotFoundException();
		}

		return education;
	}

	async create(dto: EducationDto) {
		if (await this.existEducation(dto)) {
			throw new BadRequestException('Введенний запис про викладання предмету уже існує');
		}

		const newEducation = await this.educationRepository.create(
			this.getEducationRelationship(dto)
		);

		await this.educationRepository.save(newEducation);

		return newEducation;
	}

	async update(id: string, dto: EducationDto) {
		const educationById = await this.findById(id);
		const educationByRelationship = await this.educationRepository.findOneBy(
			this.getEducationRelationship(dto)
		);

		if (educationByRelationship && educationByRelationship.id !== educationById.id) {
			throw new BadRequestException('Введенний запис про викладання предмету уже існує');
		}

		await this.educationRepository.update({ id }, this.getEducationRelationship(dto));
	}

	async delete(id: string) {
		const educationById = await this.findById(id);
		await this.educationRepository.delete({ id: educationById.id });
	}

	async existEducation(dto: EducationDto) {
		return this.educationRepository.exist({
			where: this.getEducationRelationship(dto)
		});
	}

	getEducationRelationship(dto: EducationDto) {
		return {
			teacher: { id: dto.teacherId },
			cls: { id: dto.classId },
			subject: { id: dto.subjectId }
		};
	}
}

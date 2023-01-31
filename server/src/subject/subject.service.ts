import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { SubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectService {
	constructor(
		@InjectRepository(SubjectEntity)
		private readonly subjectRepository: Repository<SubjectEntity>
	) {}

	async getAll(): Promise<SubjectEntity[]> {
		return this.subjectRepository.find();
	}

	async create(dto: SubjectDto) {
		const subject = await this.subjectRepository.findOneBy({ name: dto.name });

		if (subject) {
			throw new BadRequestException('Введений предмет уже існує');
		}

		const newSubject = await this.subjectRepository.create({
			name: dto.name
		});

		await this.subjectRepository.save(newSubject);

		return newSubject;
	}

	async update(id: string, dto: SubjectDto) {
		const subjectById = await this.subjectRepository.findOneBy({ id });
		if (!subjectById) {
			throw new NotFoundException();
		}

		const subjectByName = await this.subjectRepository.findOneBy({ name: dto.name });
		if (subjectByName) {
			throw new BadRequestException('Введений предмет уже існує');
		}

		await this.subjectRepository.update({ id }, { name: dto.name });
	}

	async delete(id: string) {
		const subject = await this.subjectRepository.findOneBy({ id });
		if (!subject) {
			throw new NotFoundException();
		}

		await this.subjectRepository.delete(subject);
	}
}

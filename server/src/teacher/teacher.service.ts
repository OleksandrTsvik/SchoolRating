import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'express-serve-static-core';
import { hash } from 'bcrypt';
import { TeacherEntity } from './teacher.entity';
import PaginationResponse from '../common/interfaces/pagination-response.interface';
import { queryParamsForWhere } from '../common/utils/query-param';
import { AddDto } from './dto/add.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class TeacherService {
	constructor(
		@InjectRepository(TeacherEntity)
		private readonly teacherRepository: Repository<TeacherEntity>
	) {}

	async getTeachers(page: number, limit: number, query: Query): Promise<PaginationResponse<TeacherEntity>> {
		const [data, total] = await this.teacherRepository.findAndCount({
			where: queryParamsForWhere(query, ['firstName', 'lastName', 'patronymic', 'email']),
			order: {
				firstName: 'ASC',
				lastName: 'ASC',
				patronymic: 'ASC'
			},
			take: limit,
			skip: limit * (page - 1)
		});

		return {
			total,
			data,
			page,
			limit
		};
	}

	async add(dto: AddDto) {
		const teacherByEmail = await this.teacherRepository.findOneBy({ email: dto.email });
		if (teacherByEmail) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		const hashedPassword = await hash(dto.password, 10);
		const newTeacher = await this.teacherRepository.create({ ...dto, hashedPassword });
		await this.teacherRepository.save(newTeacher);

		return newTeacher;
	}

	async update(id: string, dto: UpdateDto) {
		const teacher = await this.findById(id);

		const teacherByEmail = await this.teacherRepository.findOneBy({ email: dto.email });
		if (teacherByEmail && teacherByEmail.id !== teacher.id) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		teacher.firstName = dto.firstName;
		teacher.lastName = dto.lastName;
		teacher.patronymic = dto.patronymic;
		teacher.email = dto.email;

		if (dto.password) {
			teacher.hashedPassword = await hash(dto.password, 10);
		}

		await this.teacherRepository.save(teacher);
	}

	async delete(id: string) {
		const teacher = await this.findById(id);
		await this.teacherRepository.delete({ id: teacher.id });
	}

	async findById(id: string): Promise<TeacherEntity> {
		const teacher = await this.teacherRepository.findOneBy({ id });
		if (!teacher) {
			throw new NotFoundException();
		}

		return teacher;
	}
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { Query } from 'express-serve-static-core';
import { StudentEntity } from './student.entity';
import { UpdateDto } from './dto/update.dto';
import { AddDto } from './dto/add.dto';
import PaginationResponse from '../common/interfaces/pagination-response.interface';
import { queryParamsForWhere } from '../common/utils/query-param';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>
	) {}

	async getStudents(
		page: number, limit: number, query: Query, isWithoutClass: boolean
	): Promise<PaginationResponse<StudentEntity>> {
		const whereClass = isWithoutClass ? { cls: IsNull() } : {};

		const [data, total] = await this.studentRepository.findAndCount({
			where: {
				...queryParamsForWhere(query, ['firstName', 'lastName', 'patronymic', 'email']),
				...whereClass
			},
			order: {
				firstName: 'ASC',
				lastName: 'ASC',
				patronymic: 'ASC'
			},
			relations: {
				cls: true
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
		const studentByEmail = await this.studentRepository.findOneBy({ email: dto.email });
		if (studentByEmail) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		const hashedPassword = await hash(dto.password, 10);
		const newStudent = await this.studentRepository.create({ ...dto, hashedPassword });
		await this.studentRepository.save(newStudent);

		return newStudent;
	}

	async update(id: string, dto: UpdateDto) {
		const student = await this.findById(id);

		const studentByEmail = await this.studentRepository.findOneBy({ email: dto.email });
		if (studentByEmail && studentByEmail.id !== student.id) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		student.firstName = dto.firstName;
		student.lastName = dto.lastName;
		student.patronymic = dto.patronymic;
		student.email = dto.email;

		if (dto.password) {
			student.hashedPassword = await hash(dto.password, 10);
		}

		await this.studentRepository.save(student);
	}

	async delete(id: string) {
		const student = await this.findById(id);
		await this.studentRepository.delete({ id: student.id });
	}

	async findById(id: string): Promise<StudentEntity> {
		const student = await this.studentRepository.findOneBy({ id });
		if (!student) {
			throw new NotFoundException();
		}

		return student;
	}
}

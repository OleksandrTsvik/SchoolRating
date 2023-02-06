import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>
	) {}

	async getAll(): Promise<StudentEntity[]> {
		return this.studentRepository.find();
	}

	async delete(id: string) {
		const student = await this.studentRepository.findOneBy({ id });
		if (!student) {
			throw new NotFoundException();
		}

		await this.studentRepository.delete({ id: student.id });
	}
}

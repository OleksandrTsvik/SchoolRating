import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';
import { ClassDto } from './dto/class.dto';
import { StudentEntity } from '../student/student.entity';

@Injectable()
export class ClassService {
	constructor(
		@InjectRepository(ClassEntity)
		private readonly classRepository: Repository<ClassEntity>,
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>
	) {}

	async getAll(): Promise<ClassEntity[]> {
		return this.classRepository.find();
	}

	async findClasses(): Promise<ClassEntity[]> {
		return this.classRepository.find({
			relations: {
				students: true
			}
		});
	}

	async findById(id: string): Promise<ClassEntity> {
		const cls = await this.classRepository.findOne({
			where: { id },
			relations: {
				students: true
			}
		});
		if (!cls) {
			throw new NotFoundException();
		}

		return cls;
	}

	async create(dto: ClassDto) {
		const cls = await this.classRepository.findOneBy({ name: dto.name });
		if (cls) {
			throw new BadRequestException('Введений предмет уже існує');
		}

		const newClass = await this.classRepository.create({
			name: dto.name
		});

		await this.classRepository.save(newClass);

		return newClass;
	}

	async update(id: string, dto: ClassDto) {
		const cls = await this.findById(id);

		const classByName = await this.classRepository.findOneBy({ name: dto.name });
		if (classByName) {
			throw new BadRequestException(`Клас "${classByName.name}" уже існує`);
		}

		cls.name = dto.name;

		await this.classRepository.save(cls);
	}

	async addStudent(classId: string, studentId: string) {
		const cls = await this.findById(classId);
		const student = await this.studentFindById(studentId);

		student.cls = cls;

		await this.studentRepository.save(student);
	}

	async removeStudent(studentId: string) {
		const student = await this.studentFindById(studentId);

		student.cls = null;

		await this.studentRepository.save(student);
	}

	async delete(id: string) {
		await this.classRepository.delete({ id });
	}


	async studentFindById(id: string): Promise<StudentEntity> {
		const student = await this.studentRepository.findOneBy({ id });
		if (!student) {
			throw new NotFoundException();
		}

		return student;
	}
}

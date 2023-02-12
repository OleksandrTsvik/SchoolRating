import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';
import { ClassDto } from './dto/class.dto';

@Injectable()
export class ClassService {
	constructor(
		@InjectRepository(ClassEntity)
		private readonly classRepository: Repository<ClassEntity>
	) {}

	async findClasses(): Promise<ClassEntity[]> {
		return this.classRepository.find();
	}

	async findById(id: string): Promise<ClassEntity> {
		const cls = await this.classRepository.findOneBy({ id });
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

	async delete(id: string) {
		const cls = await this.findById(id);
		await this.classRepository.delete(cls);
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { AdminModel } from './admin.model';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(AdminModel)
		private readonly repository: Repository<AdminModel>
	) {}

	async getAll(): Promise<AdminModel[]> {
		return this.repository.find();
	}

	async findById(id: string): Promise<AdminModel | null> {
		return this.repository.findOneBy({ id });
	}

	async delete(id: string) {
		return this.repository.delete({ id });
	}

	async update(id: string, dto: UpdateDto) {
		const admin = await this.findById(id);
		if (!admin) {
			throw new NotFoundException();
		}

		if (dto.email) {
			admin.email = dto.email;
		}

		if (dto.password) {
			admin.password = await hash(dto.password, 12);
		}

		await this.repository.save(admin);
	}
}

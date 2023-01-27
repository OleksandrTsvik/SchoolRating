import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { AdminEntity } from './admin.entity';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(AdminEntity)
		private readonly adminRepository: Repository<AdminEntity>
	) {}

	async getAll(): Promise<AdminEntity[]> {
		return this.adminRepository.find();
	}

	async findById(id: string): Promise<AdminEntity> {
		const admin = await this.adminRepository.findOneBy({ id });
		if (!admin) {
			throw new NotFoundException();
		}

		return admin;
	}

	async delete(id: string) {
		return this.adminRepository.delete({ id });
	}

	async update(id: string, dto: UpdateDto) {
		const admin = await this.findById(id);

		if (dto.email) {
			admin.email = dto.email;
		}

		if (dto.password) {
			admin.hashedPassword = await hash(dto.password, 10);
		}

		await this.adminRepository.save(admin);
	}
}

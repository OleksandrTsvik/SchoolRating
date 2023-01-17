import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminModel } from './admin.model';
import { Repository } from 'typeorm';
import { AdminDto } from './dto/admin-dto';
import { hash } from 'bcryptjs';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(AdminModel)
		private readonly repository: Repository<AdminModel>
	) {}

	async register(dto: AdminDto) {
		const admin = await this.findByEmail(dto.email);
		if (admin) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		const hashedPassword = await hash(dto.password, 12);
		const newAdmin = await this.repository.create({
			email: dto.email,
			password: hashedPassword
		});

		await this.repository.save(newAdmin);

		return newAdmin;
	}

	async findById(id: string): Promise<AdminModel | null> {
		return this.repository.findOneBy({ id });
	}

	async findByEmail(email: string): Promise<AdminModel | null> {
		return this.repository.findOneBy({ email });
	}

	async delete(id: string) {
		return this.repository.delete({ id });
	}

	async update(id: string, dto: AdminDto) {

	}
}

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { AdminEntity } from './admin.entity';
import { ChangePasswordDto } from './dto/change-password.dto';

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

	async changePassword(id: string, dto: ChangePasswordDto) {
		const admin = await this.findById(id);

		const passwordMatches = await compare(dto.currentPassword, admin.hashedPassword);
		if (!passwordMatches) {
			throw new BadRequestException('Невірний поточний пароль');
		}

		admin.hashedPassword = await hash(dto.newPassword, 10);

		await this.adminRepository.save(admin);
	}
}

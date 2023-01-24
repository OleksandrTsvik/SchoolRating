import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { AdminModel } from './admin.model';
import { AuthPayloadDto } from '../authorization/dto/auth-payload.dto';
import { Role } from '../authorization/dto/role.enum';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AdminModel)
		private readonly repository: Repository<AdminModel>,
		private readonly jwtService: JwtService
	) {}

	async register(dto: AuthDto) {
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
		const { password, ...result } = newAdmin;

		return result;
	}

	async login(email: string) {
		const payload: AuthPayloadDto = {
			email,
			role: Role.Admin
		};

		return {
			user: {
				...payload
			},
			token: await this.jwtService.signAsync(payload)
		};
	}

	async findByEmail(email: string): Promise<AdminModel | null> {
		return this.repository.findOneBy({ email });
	}

	async validate(dto: AuthDto): Promise<Pick<AuthPayloadDto, 'email'>> {
		const admin = await this.findByEmail(dto.email);
		if (!admin) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		const isCorrectPassword = await compare(dto.password, admin.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		return {
			email: admin.email
		};
	}
}

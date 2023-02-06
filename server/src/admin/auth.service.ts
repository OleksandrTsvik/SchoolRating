import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { AdminEntity } from './admin.entity';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { Role } from '../common/enums/role.enum';
import {
	clearCookie,
	getCookieWithJwtAccessToken,
	getCookieWithJwtRefreshToken
} from 'src/common/utils/cookie-with-jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AdminEntity)
		private readonly adminRepository: Repository<AdminEntity>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async register(dto: AuthDto) {
		const admin = await this.findByEmail(dto.email);
		if (admin) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		const hashedPassword = await hash(dto.password, 10);
		const newAdmin = await this.adminRepository.create({
			email: dto.email,
			hashedPassword
		});

		await this.adminRepository.save(newAdmin);

		return newAdmin;
	}

	async login(admin: AdminEntity) {
		const { id, email } = admin;
		const jwtPayload = this.getJwtPayload(id, email);

		const { cookieAuthentication } = await getCookieWithJwtAccessToken(this.configService,
			this.jwtService, jwtPayload, 'AdminAuthentication');

		const { cookieRefresh, refreshToken } = await getCookieWithJwtRefreshToken(this.configService,
			this.jwtService, jwtPayload, 'AdminRefresh');

		await this.updateRefreshToken(id, refreshToken);

		return {
			user: jwtPayload,
			cookies: {
				cookieAuthentication,
				cookieRefresh
			}
		};
	}

	async logout(id: string) {
		await this.adminRepository.update({ id }, { hashedRefreshToken: null });

		return clearCookie('AdminAuthentication', 'AdminRefresh');
	}

	async findByEmail(email: string): Promise<AdminEntity | null> {
		return this.adminRepository.findOneBy({ email });
	}

	async updateRefreshToken(id: string, refreshToken: string) {
		const hashedRefreshToken = await hash(refreshToken, 10);
		await this.adminRepository.update({ id }, { hashedRefreshToken });
	}

	async validate(dto: AuthDto): Promise<AdminEntity> {
		const admin = await this.findByEmail(dto.email);
		if (!admin) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		const passwordMatches = await compare(dto.password, admin.hashedPassword);
		if (!passwordMatches) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		return admin;
	}

	async getCookieWithJwtAccessToken(id: string, email: string) {
		return getCookieWithJwtAccessToken(this.configService, this.jwtService,
			this.getJwtPayload(id, email), 'AdminAuthentication');
	}

	async existAdmin(id: string): Promise<boolean> {
		return this.adminRepository.exist({ where: { id } });
	}

	async tokenMatches(id: string, refreshToken: string): Promise<boolean> {
		const admin = await this.adminRepository.findOneBy({ id });

		if (!admin || !admin.hashedRefreshToken) {
			return false;
		}

		return compare(refreshToken, admin.hashedRefreshToken);
	}

	getJwtPayload(id: string, email: string): JwtPayloadDto {
		return {
			id,
			email,
			role: Role.Admin
		};
	}
}

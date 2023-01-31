import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { AdminEntity } from './admin.entity';
import { AuthAdminPayloadDto } from '../common/authentication/dto/auth-admin-payload.dto';
import { Role } from '../common/authentication/dto/role.enum';

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

		const { cookieAuthentication } = await this.getCookieWithJwtAccessToken(id, email);
		const { cookieRefresh, refreshToken } = await this.getCookieWithJwtRefreshToken(id, email);

		await this.updateRefreshToken(id, refreshToken);

		return {
			user: this.getJwtPayload(id, email),
			cookies: {
				cookieAuthentication,
				cookieRefresh
			}
		};
	}

	async logout(id: string) {
		await this.adminRepository.update({ id }, { hashedRefreshToken: null });

		return [
			'Authentication=; HttpOnly; Path=/; Max-Age=0',
			'Refresh=; HttpOnly; Path=/; Max-Age=0'
		];
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
		const jwtPayload = this.getJwtPayload(id, email);
		const expiresIn = this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');

		const accessToken = await this.jwtService.signAsync(jwtPayload, {
			secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
			expiresIn: expiresIn
		});

		const cookieAuthentication = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expiresIn}`;

		return {
			cookieAuthentication,
			accessToken
		};
	}

	async getCookieWithJwtRefreshToken(id: string, email: string) {
		const jwtPayload = this.getJwtPayload(id, email);
		const expiresIn = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');

		const refreshToken = await this.jwtService.signAsync(jwtPayload, {
			secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
			expiresIn: expiresIn
		});

		const cookieRefresh = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${expiresIn}`;

		return {
			cookieRefresh,
			refreshToken
		};
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

	getJwtPayload(id: string, email: string): AuthAdminPayloadDto {
		return {
			id,
			email,
			role: Role.Admin
		};
	}
}

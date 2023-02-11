import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { RegisterDto } from './dto/register.dto';
import {
	clearCookie,
	getCookieWithJwtAccessToken,
	getCookieWithJwtRefreshToken
} from '../common/utils/cookie-with-jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { TeacherEntity } from './teacher.entity';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(TeacherEntity)
		private readonly teacherRepository: Repository<TeacherEntity>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async register(dto: RegisterDto) {
		const teacher = await this.findByEmail(dto.email);
		if (teacher) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		const hashedPassword = await hash(dto.password, 10);
		const newTeacher = await this.teacherRepository.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			patronymic: dto.patronymic,
			email: dto.email,
			hashedPassword
		});

		await this.teacherRepository.save(newTeacher);

		return newTeacher;
	}

	async login(teacher: TeacherEntity) {
		const jwtPayload = this.getJwtPayload(teacher);

		const { cookieAuthentication } = await getCookieWithJwtAccessToken(this.configService,
			this.jwtService, jwtPayload, 'Authentication');

		const { cookieRefresh, refreshToken } = await getCookieWithJwtRefreshToken(this.configService,
			this.jwtService, jwtPayload, 'Refresh');

		await this.updateRefreshToken(teacher.id, refreshToken);

		return {
			user: jwtPayload,
			cookies: {
				cookieAuthentication,
				cookieRefresh
			}
		};
	}

	async logout(id: string) {
		await this.teacherRepository.update({ id }, { hashedRefreshToken: null });

		return clearCookie('Authentication', 'Refresh');
	}

	async validate(dto: LoginDto): Promise<TeacherEntity> {
		const teacher = await this.findByEmail(dto.email);
		if (!teacher) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		const passwordMatches = await compare(dto.password, teacher.hashedPassword);
		if (!passwordMatches) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		return teacher;
	}

	async updateRefreshToken(id: string, refreshToken: string) {
		const hashedRefreshToken = await hash(refreshToken, 10);
		await this.teacherRepository.update({ id }, { hashedRefreshToken });
	}

	async getCookieWithJwtAccessToken(
		teacher: Omit<TeacherEntity, 'hashedPassword' | 'hashedRefreshToken' | 'updatedAt'>
	) {
		return getCookieWithJwtAccessToken(this.configService, this.jwtService,
			this.getJwtPayload(teacher), 'Authentication');
	}

	async findByEmail(email: string): Promise<TeacherEntity | null> {
		return this.teacherRepository.findOneBy({ email });
	}

	async existTeacher(id: string): Promise<boolean> {
		return this.teacherRepository.exist({ where: { id } });
	}

	async tokenMatches(id: string, refreshToken: string): Promise<boolean> {
		const teacher = await this.teacherRepository.findOneBy({ id });

		if (!teacher || !teacher.hashedRefreshToken) {
			return false;
		}

		return compare(refreshToken, teacher.hashedRefreshToken);
	}

	getJwtPayload(
		teacher: Omit<TeacherEntity, 'hashedPassword' | 'hashedRefreshToken' | 'updatedAt'>
	): JwtPayloadDto {
		return {
			id: teacher.id,
			firstName: teacher.firstName,
			lastName: teacher.lastName,
			patronymic: teacher.patronymic,
			email: teacher.email,
			createdAt: teacher.createdAt,
			role: Role.Teacher
		};
	}
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { StudentEntity } from './student.entity';
import { RegisterDto } from './dto/register.dto';
import {
	clearCookie,
	getCookieWithJwtAccessToken,
	getCookieWithJwtRefreshToken
} from '../common/utils/cookie-with-jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async register(dto: RegisterDto) {
		const student = await this.findByEmail(dto.email);
		if (student) {
			throw new BadRequestException('Електронна адреса використовується');
		}

		const hashedPassword = await hash(dto.password, 10);
		const newStudent = await this.studentRepository.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			patronymic: dto.patronymic,
			email: dto.email,
			hashedPassword
		});

		await this.studentRepository.save(newStudent);

		return newStudent;
	}

	async login(student: StudentEntity) {
		const jwtPayload = this.getJwtPayload(student);

		const { cookieAuthentication } = await getCookieWithJwtAccessToken(this.configService,
			this.jwtService, jwtPayload, 'Authentication');

		const { cookieRefresh, refreshToken } = await getCookieWithJwtRefreshToken(this.configService,
			this.jwtService, jwtPayload, 'Refresh');

		await this.updateRefreshToken(student.id, refreshToken);

		return {
			user: jwtPayload,
			cookies: {
				cookieAuthentication,
				cookieRefresh
			}
		};
	}

	async logout(id: string) {
		await this.studentRepository.update({ id }, { hashedRefreshToken: null });

		return clearCookie('Authentication', 'Refresh');
	}

	async validate(dto: LoginDto): Promise<StudentEntity> {
		const student = await this.findByEmail(dto.email);
		if (!student) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		const passwordMatches = await compare(dto.password, student.hashedPassword);
		if (!passwordMatches) {
			throw new UnauthorizedException('Неправильна електронна адреса або пароль');
		}

		return student;
	}

	async updateRefreshToken(id: string, refreshToken: string) {
		const hashedRefreshToken = await hash(refreshToken, 10);
		await this.studentRepository.update({ id }, { hashedRefreshToken });
	}

	async getCookieWithJwtAccessToken(student: JwtPayloadDto) {
		return getCookieWithJwtAccessToken(this.configService, this.jwtService,
			this.getJwtPayload(student), 'Authentication');
	}

	async findByEmail(email: string): Promise<StudentEntity | null> {
		return this.studentRepository.findOneBy({ email });
	}

	async existStudent(id: string): Promise<boolean> {
		return this.studentRepository.exist({ where: { id } });
	}

	async tokenMatches(id: string, refreshToken: string): Promise<boolean> {
		const student = await this.studentRepository.findOneBy({ id });

		if (!student || !student.hashedRefreshToken) {
			return false;
		}

		return compare(refreshToken, student.hashedRefreshToken);
	}

	getJwtPayload(student: Omit<JwtPayloadDto, 'role'>): JwtPayloadDto {
		return {
			id: student.id,
			firstName: student.firstName,
			lastName: student.lastName,
			patronymic: student.patronymic,
			email: student.email,
			createdAt: student.createdAt,
			role: Role.Student
		};
	}
}

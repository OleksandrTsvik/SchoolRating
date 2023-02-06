import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { Role } from '../../common/enums/role.enum';
import { AuthService } from '../auth.service';
import { getJwtAccessTokenStrategyConfig } from '../../configs/jwt-access-token-strategy.config';

@Injectable()
export class StudentJwtAtStrategy extends PassportStrategy(Strategy, 'student-jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super(getJwtAccessTokenStrategyConfig(configService, 'Authentication'));
	}

	async validate(dto: JwtPayloadDto) {
		if (
			dto.role !== Role.Student ||
			!await this.authService.existStudent(dto.id)
		) {
			throw new ForbiddenException();
		}

		return dto;
	}
}
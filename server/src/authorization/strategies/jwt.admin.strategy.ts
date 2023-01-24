import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthPayloadDto } from '../dto/auth-payload.dto';
import { getJwtStrategyConfig } from '../../configs/jwt.strategy.config';
import { Role } from '../dto/role.enum';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService
	) {
		super(getJwtStrategyConfig(configService));
	}

	async validate(dto: AuthPayloadDto) {
		if (dto.role !== Role.Admin) {
			throw new ForbiddenException();
		}

		return dto;
	}
}
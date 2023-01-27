import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthPayloadDto } from '../dto/auth-payload.dto';
import { getJwtRefreshTokenStrategyConfig } from '../../configs/jwt-refresh-token-strategy.config';
import { Role } from '../dto/role.enum';
import { AuthService } from '../../admin/auth.service';

@Injectable()
export class JwtAdminRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super(getJwtRefreshTokenStrategyConfig(configService));
	}

	async validate(request: Request, dto: AuthPayloadDto) {
		const refreshToken = request.cookies?.Refresh;

		if (
			dto.role !== Role.Admin ||
			!await this.authService.tokenMatches(dto.id, refreshToken)
		) {
			throw new ForbiddenException();
		}

		return dto;
	}
}
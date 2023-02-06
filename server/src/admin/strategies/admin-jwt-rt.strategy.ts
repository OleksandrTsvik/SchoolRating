import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { Role } from '../../common/enums/role.enum';
import { AuthService } from '../auth.service';
import { getJwtRefreshTokenStrategyConfig } from 'src/configs/jwt-refresh-token-strategy.config';

@Injectable()
export class AdminJwtRtStrategy extends PassportStrategy(Strategy, 'admin-jwt-refresh-token') {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super(getJwtRefreshTokenStrategyConfig(configService, 'AdminRefresh'));
	}

	async validate(request: Request, dto: JwtPayloadDto) {
		const refreshToken = request.cookies?.AdminRefresh;

		if (
			dto.role !== Role.Admin ||
			!await this.authService.tokenMatches(dto.id, refreshToken)
		) {
			throw new ForbiddenException();
		}

		return dto;
	}
}
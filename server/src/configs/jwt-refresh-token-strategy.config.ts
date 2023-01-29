import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

export function getJwtRefreshTokenStrategyConfig(configService: ConfigService) {
	return {
		jwtFromRequest: ExtractJwt.fromExtractors([
			(request: Request) => {
				return request?.cookies?.Refresh;
			}
		]),
		ignoreExpiration: false,
		secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
		passReqToCallback: true
	};
}
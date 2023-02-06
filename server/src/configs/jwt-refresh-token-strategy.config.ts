import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

export function getJwtRefreshTokenStrategyConfig(
	configService: ConfigService,
	cookieType: 'Refresh' | 'AdminRefresh'
) {
	return {
		jwtFromRequest: ExtractJwt.fromExtractors([
			(request: Request) => {
				return request?.cookies[cookieType];
			}
		]),
		ignoreExpiration: false,
		secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
		passReqToCallback: true
	};
}

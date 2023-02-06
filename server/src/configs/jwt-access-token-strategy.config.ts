import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

export function getJwtAccessTokenStrategyConfig(
	configService: ConfigService,
	cookieType: 'Authentication' | 'AdminAuthentication'
) {
	return {
		jwtFromRequest: ExtractJwt.fromExtractors([
			(request: Request) => {
				return request?.cookies[cookieType];
			}
		]),
		ignoreExpiration: false,
		secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
	};
}

import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

export function getJwtAccessTokenStrategyConfig(configService: ConfigService) {
	return {
		jwtFromRequest: ExtractJwt.fromExtractors([
			(request: Request) => {
				return request?.cookies?.Authentication;
			},
		]),
		ignoreExpiration: false,
		secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
	};
}
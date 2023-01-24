import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

export function getJwtStrategyConfig(configService: ConfigService) {
	return {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		ignoreExpiration: false,
		secretOrKey: configService.get('JWT_SECRET')
	};
}
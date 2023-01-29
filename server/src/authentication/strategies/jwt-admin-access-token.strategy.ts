import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthAdminPayloadDto } from '../dto/auth-admin-payload.dto';
import { getJwtAccessTokenStrategyConfig } from '../../configs/jwt-access-token-strategy.config';
import { Role } from '../dto/role.enum';
import { AuthService } from '../../admin/auth.service';

@Injectable()
export class JwtAdminAccessTokenStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly authService: AuthService
	) {
		super(getJwtAccessTokenStrategyConfig(configService));
	}

	async validate(dto: AuthAdminPayloadDto) {
		if (
			dto.role !== Role.Admin ||
			!await this.authService.existAdmin(dto.id)
		) {
			throw new ForbiddenException();
		}

		return dto;
	}
}
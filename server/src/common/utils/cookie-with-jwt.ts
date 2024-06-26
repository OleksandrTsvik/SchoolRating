import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const settingsCookie = 'HttpOnly; SameSite=None; Secure; Path=/;';

export async function getCookieWithJwtAccessToken(
	configService: ConfigService,
	jwtService: JwtService,
	jwtPayload: string | object | Buffer,
	cookieType: 'Authentication' | 'AdminAuthentication'
) {
	const expiresIn = configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');

	const accessToken = await jwtService.signAsync(jwtPayload, {
		secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
		expiresIn: expiresIn
	});

	const cookieAuthentication = `${cookieType}=${accessToken}; ${settingsCookie} Max-Age=${expiresIn}`;

	return {
		cookieAuthentication,
		accessToken
	};
}

export async function getCookieWithJwtRefreshToken(
	configService: ConfigService,
	jwtService: JwtService,
	jwtPayload: string | object | Buffer,
	cookieType: 'Refresh' | 'AdminRefresh'
) {
	const expiresIn = configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');

	const refreshToken = await jwtService.signAsync(jwtPayload, {
		secret: configService.get('JWT_REFRESH_TOKEN_SECRET'),
		expiresIn: expiresIn
	});

	const cookieRefresh = `${cookieType}=${refreshToken}; ${settingsCookie} Max-Age=${expiresIn}`;

	return {
		cookieRefresh,
		refreshToken
	};
}

export function clearCookie(
	cookieAuthentication: 'Authentication' | 'AdminAuthentication',
	cookieRefresh: 'Refresh' | 'AdminRefresh'
) {
	return [
		`${cookieAuthentication}=; ${settingsCookie} Max-Age=0`,
		`${cookieRefresh}=; ${settingsCookie} Max-Age=0`
	];
}
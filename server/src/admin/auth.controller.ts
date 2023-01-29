import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Put,
	Req,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtRefreshTokenGuard } from '../authentication/guards/jwt-refresh-token.guard';
import RequestWithUser from '../authentication/request-with-user.interface';
import { JwtAuthGuard } from '../authentication/guards/jwt.guard';

@Controller('admin/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@Post('register')
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Req() request: RequestWithUser, @Body() dto: AuthDto) {
		const admin = await this.authService.validate(dto);
		const {
			user,
			cookies: { cookieRefresh, cookieAuthentication }
		} = await this.authService.login(admin);

		request.res?.setHeader('Set-Cookie', [cookieRefresh, cookieAuthentication]);

		return user;
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() request: RequestWithUser) {
		const cookies = await this.authService.logout(request.user?.id);

		request.res?.setHeader('Set-Cookie', cookies);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/me')
	async me(@Req() request: RequestWithUser) {
		return request.user;
	}

	@UseGuards(JwtRefreshTokenGuard)
	@Put('refresh')
	async refresh(@Req() request: RequestWithUser) {
		const { id, email } = request.user;
		const { cookieAuthentication } = await this.authService.getCookieWithJwtAccessToken(id, email);

		request.res?.setHeader('Set-Cookie', cookieAuthentication);
		return request.user;
	}
}

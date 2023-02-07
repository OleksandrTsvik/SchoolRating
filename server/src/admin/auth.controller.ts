import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Put,
	Req,
	UseGuards
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AdminJwtRtGuard } from './guards/admin-jwt-rt.guard';
import RequestWithUser from './dto/request-with-user.interface';
import { AdminJwtGuard } from './guards/admin-jwt.guard';

@Controller('admin/auth')
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

	@UseGuards(AdminJwtGuard)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() request: RequestWithUser) {
		const cookies = await this.authService.logout(request.user?.id);

		request.res?.setHeader('Set-Cookie', cookies);
	}

	@UseGuards(AdminJwtGuard)
	@Get('/me')
	async me(@Req() request: RequestWithUser) {
		return request.user;
	}

	@UseGuards(AdminJwtRtGuard)
	@Put('refresh')
	async refresh(@Req() request: RequestWithUser) {
		const { id, email } = request.user;
		const { cookieAuthentication } = await this.authService.getCookieWithJwtAccessToken(id, email);

		request.res?.setHeader('Set-Cookie', cookieAuthentication);
		return request.user;
	}
}

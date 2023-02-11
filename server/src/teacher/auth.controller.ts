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
import { AuthService } from './auth.service';
import RequestWithUser from '../common/interfaces/request-with-user.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TeacherJwtRtGuard } from './guards/teacher-jwt-rt.guard';
import { TeacherJwtGuard } from './guards/teacher-jwt.guard';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Controller('teacher/auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Req() request: RequestWithUser<JwtPayloadDto>, @Body() dto: LoginDto) {
		const teacher = await this.authService.validate(dto);
		const {
			user,
			cookies: { cookieRefresh, cookieAuthentication }
		} = await this.authService.login(teacher);

		request.res?.setHeader('Set-Cookie', [cookieRefresh, cookieAuthentication]);

		return user;
	}

	@UseGuards(TeacherJwtGuard)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() request: RequestWithUser<JwtPayloadDto>) {
		const cookies = await this.authService.logout(request.user?.id);

		request.res?.setHeader('Set-Cookie', cookies);
	}

	@UseGuards(TeacherJwtGuard)
	@Get('/me')
	async me(@Req() request: RequestWithUser<JwtPayloadDto>) {
		return request.user;
	}

	@UseGuards(TeacherJwtRtGuard)
	@Put('refresh')
	async refresh(@Req() request: RequestWithUser<JwtPayloadDto>) {
		const { cookieAuthentication } = await this.authService.getCookieWithJwtAccessToken(request.user);

		request.res?.setHeader('Set-Cookie', cookieAuthentication);
		return request.user;
	}
}

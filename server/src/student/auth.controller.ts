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
import { AuthService } from './auth.service';
import RequestWithUser from './dto/request-with-user.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { StudentJwtRtGuard } from './guards/student-jwt-rt.guard';
import { StudentJwtGuard } from './guards/student-jwt.guard';

@Controller('student/auth')
@UseInterceptors(ClassSerializerInterceptor)
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
	async login(@Req() request: RequestWithUser, @Body() dto: LoginDto) {
		const student = await this.authService.validate(dto);
		const {
			user,
			cookies: { cookieRefresh, cookieAuthentication }
		} = await this.authService.login(student);

		request.res?.setHeader('Set-Cookie', [cookieRefresh, cookieAuthentication]);

		return user;
	}

	@UseGuards(StudentJwtGuard)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() request: RequestWithUser) {
		const cookies = await this.authService.logout(request.user?.id);

		request.res?.setHeader('Set-Cookie', cookies);
	}

	@UseGuards(StudentJwtGuard)
	@Get('/me')
	async me(@Req() request: RequestWithUser) {
		return request.user;
	}

	@UseGuards(StudentJwtRtGuard)
	@Put('refresh')
	async refresh(@Req() request: RequestWithUser) {
		const { cookieAuthentication } = await this.authService.getCookieWithJwtAccessToken(request.user);

		request.res?.setHeader('Set-Cookie', cookieAuthentication);
		return request.user;
	}
}

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
import { StudentJwtRtGuard } from './guards/student-jwt-rt.guard';
import { StudentJwtGuard } from './guards/student-jwt.guard';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Controller('student/auth')
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
	async logout(@Req() request: RequestWithUser<JwtPayloadDto>) {
		const cookies = await this.authService.logout(request.user?.id);

		request.res?.setHeader('Set-Cookie', cookies);
	}

	@UseGuards(StudentJwtGuard)
	@Get('/me')
	async me(@Req() request: RequestWithUser<JwtPayloadDto>) {
		return request.user;
	}

	@UseGuards(StudentJwtRtGuard)
	@Put('refresh')
	async refresh(@Req() request: RequestWithUser<JwtPayloadDto>) {
		const { cookieAuthentication } = await this.authService.getCookieWithJwtAccessToken(request.user);

		request.res?.setHeader('Set-Cookie', cookieAuthentication);
		return request.user;
	}
}

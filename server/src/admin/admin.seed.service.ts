import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Injectable()
export class AdminSeedService implements OnApplicationBootstrap {
	constructor(
		private readonly authService: AuthService
	) {}

	async onApplicationBootstrap() {
		const newAdmin: AuthDto = {
			email: 'admin@gmail.com',
			password: '123456'
		};

		const admin = await this.authService.findByEmail(newAdmin.email);
		if (admin) {
			return;
		}

		await this.authService.register(newAdmin);
	}
}

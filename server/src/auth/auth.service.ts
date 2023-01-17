import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor() {}

	async register(dto: AuthDto) {

	}
}

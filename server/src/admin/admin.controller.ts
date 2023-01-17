import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin-dto';

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService
	) {}

	@Post('register')
	async register(@Body() dto: AdminDto) {
		return this.adminService.register(dto);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const admin = await this.adminService.findById(id);
		if (!admin) {
			throw new NotFoundException();
		}

		return admin;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.adminService.delete(id);
	}

	@Put(':id')
	async update(id: string, @Body() dto: AdminDto) {
		return this.adminService.update(id, dto);
	}
}

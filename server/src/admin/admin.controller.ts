import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	UseGuards, UseInterceptors
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../authentication/guards/jwt.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {
	constructor(
		private readonly adminService: AdminService
	) {}

	@Get()
	async findAll() {
		return this.adminService.getAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.adminService.findById(id);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.adminService.delete(id);
	}

	@Patch('change-password/:id')
	async changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
		return this.adminService.changePassword(id, dto);
	}
}

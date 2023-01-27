import {
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	UseGuards, UseInterceptors
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../authentication/guards/jwt.guard';
import { UpdateDto } from './dto/update.dto';

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

	@Put(':id')
	async update(@Param('id') id: string, dto: UpdateDto) {
		return this.adminService.update(id, dto);
	}
}

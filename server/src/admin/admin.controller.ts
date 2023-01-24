import {
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Put,
	UseGuards
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../authorization/guards/jwt.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
	constructor(
		private readonly adminService: AdminService
	) {}

	@Get()
	async findAll() {
		const admins = await this.adminService.getAll();

		return admins.map(admin => {
			const { password, ...result } = admin;
			return result;
		});
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const admin = await this.adminService.findById(id);
		if (!admin) {
			throw new NotFoundException();
		}

		const { password, ...result } = admin;

		return result;
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

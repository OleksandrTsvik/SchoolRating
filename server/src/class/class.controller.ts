import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../admin/guards/admin-jwt.guard';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';

@Controller('class')
@UseGuards(AdminJwtGuard)
export class ClassController {
	constructor(
		private readonly classService: ClassService
	) {}

	@Get()
	async findClasses() {
		return this.classService.findClasses();
	}

	@Post()
	async create(@Body() dto: ClassDto) {
		return this.classService.create(dto);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: ClassDto) {
		return this.classService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.classService.delete(id);
	}
}

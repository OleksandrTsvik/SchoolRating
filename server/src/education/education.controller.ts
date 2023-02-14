import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminJwtGuard } from '../admin/guards/admin-jwt.guard';
import { EducationService } from './education.service';
import { EducationDto } from './dto/education.dto';

@Controller('education')
@UseGuards(AdminJwtGuard)
export class EducationController {
	constructor(
		private readonly educationService: EducationService
	) {}

	@Get()
	async findAll() {
		return this.educationService.getAll();
	}

	@Post()
	async create(@Body() dto: EducationDto) {
		return this.educationService.create(dto);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: EducationDto) {
		return this.educationService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.educationService.delete(id);
	}
}

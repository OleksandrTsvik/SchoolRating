import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/authentication/guards/jwt.guard';
import { SubjectService } from './subject.service';
import { SubjectDto } from './dto/subject.dto';

@Controller('subject')
@UseGuards(JwtAuthGuard)
export class SubjectController {
	constructor(
		private readonly subjectService: SubjectService
	) {}

	@Get()
	async findAll() {
		return this.subjectService.getAll();
	}

	@Post()
	async create(@Body() dto: SubjectDto) {
		return this.subjectService.create(dto);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: SubjectDto) {
		return this.subjectService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.subjectService.delete(id);
	}
}

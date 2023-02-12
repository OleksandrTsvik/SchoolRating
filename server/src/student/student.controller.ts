import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	Param,
	ParseBoolPipe,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { StudentService } from './student.service';
import { UpdateDto } from './dto/update.dto';
import { AddDto } from './dto/add.dto';
import { AdminJwtGuard } from '../admin/guards/admin-jwt.guard';

@Controller('student')
export class StudentController {
	constructor(
		private readonly studentService: StudentService
	) {}

	@UseGuards(AdminJwtGuard)
	@Get()
	async findStudents(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
		@Query('isWithoutClass', new DefaultValuePipe(false), ParseBoolPipe) isWithoutClass: boolean = false,
		@Query() query: ExpressQuery
	) {
		return this.studentService.getStudents(page, limit, query, isWithoutClass);
	}

	@UseGuards(AdminJwtGuard)
	@Post()
	async add(@Body() dto: AddDto) {
		return this.studentService.add(dto);
	}

	@UseGuards(AdminJwtGuard)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateDto) {
		return this.studentService.update(id, dto);
	}

	@UseGuards(AdminJwtGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.studentService.delete(id);
	}
}

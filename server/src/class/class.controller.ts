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
import { AdminJwtGuard } from '../admin/guards/admin-jwt.guard';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
import { StudentService } from '../student/student.service';

@Controller('class')
@UseGuards(AdminJwtGuard)
export class ClassController {
	constructor(
		private readonly classService: ClassService,
		private readonly studentService: StudentService
	) {}

	@Get('all')
	async getAll() {
		return this.classService.getAll();
	}

	@Get()
	async findClasses() {
		return this.classService.findClasses();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.classService.findById(id);
	}

	@Get('students/without-class')
	async studentsWithoutClass(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
		@Query('isWithoutClass', new DefaultValuePipe(false), ParseBoolPipe) isWithoutClass: boolean = false,
		@Query() query: ExpressQuery
	) {
		return this.studentService.getStudents(page, limit, query, isWithoutClass);
	}

	@Post()
	async create(@Body() dto: ClassDto) {
		return this.classService.create(dto);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: ClassDto) {
		return this.classService.update(id, dto);
	}

	@Patch(':classId/add-student/:studentId')
	async addStudent(
		@Param('classId') classId: string,
		@Param('studentId') studentId: string
	) {
		return this.classService.addStudent(classId, studentId);
	}

	@Patch('remove-student/:studentId')
	async removeStudent(@Param('studentId') studentId: string) {
		return this.classService.removeStudent(studentId);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.classService.delete(id);
	}
}

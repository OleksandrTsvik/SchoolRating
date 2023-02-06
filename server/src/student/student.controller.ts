import { Controller, Delete, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
	constructor(
		private readonly studentService: StudentService
	) {}

	@Get()
	async findAll() {
		return this.studentService.getAll();
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.studentService.delete(id);
	}
}

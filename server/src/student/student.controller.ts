import { Controller, Get } from '@nestjs/common';
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
}

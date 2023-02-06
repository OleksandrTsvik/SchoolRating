import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateDto } from './dto/update.dto';

@Controller('student')
export class StudentController {
	constructor(
		private readonly studentService: StudentService
	) {}

	@Get()
	async findAll() {
		return this.studentService.getAll();
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateDto) {
		return this.studentService.update(id, dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.studentService.delete(id);
	}
}

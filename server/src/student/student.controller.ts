import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards
} from '@nestjs/common';
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
	async findAll(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
	) {
		return this.studentService.getAll(page, limit);
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

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
	Req,
	UseGuards
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import RequestWithUser from '../common/interfaces/request-with-user.interface';
import { AdminJwtGuard } from '../admin/guards/admin-jwt.guard';
import { TeacherService } from './teacher.service';
import { TeacherJwtGuard } from './guards/teacher-jwt.guard';
import { AddDto } from './dto/add.dto';
import { UpdateDto } from './dto/update.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Controller('teacher')
export class TeacherController {
	constructor(
		private readonly teacherService: TeacherService
	) {}

	@UseGuards(AdminJwtGuard)
	@Get('all')
	async getAll() {
		return this.teacherService.getAll();
	}

	@UseGuards(TeacherJwtGuard)
	@Get('gradebook')
	async getGradebookClasses(@Req() request: RequestWithUser<JwtPayloadDto>) {
		return this.teacherService.findById(request.user.id);
	}

	@UseGuards(TeacherJwtGuard)
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return this.teacherService.findById(id);
	}

	@UseGuards(AdminJwtGuard)
	@Get()
	async findTeachers(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
		@Query() query: ExpressQuery
	) {
		return this.teacherService.getTeachers(page, limit, query);
	}

	@UseGuards(AdminJwtGuard)
	@Post()
	async add(@Body() dto: AddDto) {
		return this.teacherService.add(dto);
	}

	@UseGuards(AdminJwtGuard)
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateDto) {
		return this.teacherService.update(id, dto);
	}

	@UseGuards(AdminJwtGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.teacherService.delete(id);
	}
}

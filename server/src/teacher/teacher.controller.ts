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
import { RatingService } from '../rating/rating.service';
import { AddRatingColumnDto } from '../rating/dto/add-rating-column.dto';
import { RemoveRatingColumnDto } from '../rating/dto/remove-rating-column.dto';
import { UpdateDateRatingColumnDto } from '../rating/dto/update-date-rating-column.dto';
import { UpdateDescriptionRatingColumnDto } from '../rating/dto/update-description-rating-column.dto';
import { DateRangeDto } from '../rating/dto/date-range.dto';
import { UpdateRatingDto } from '../rating/dto/update-rating.dto';

@Controller('teacher')
export class TeacherController {
	constructor(
		private readonly teacherService: TeacherService,
		private readonly ratingService: RatingService
	) {}

	@UseGuards(AdminJwtGuard)
	@Get('all')
	async getAll() {
		return this.teacherService.getAll();
	}

	@UseGuards(TeacherJwtGuard)
	@Get('gradebooks/:id')
	async getGradebooks(@Param('id') id: string) {
		return this.teacherService.getGradebooks(id);
	}

	@UseGuards(TeacherJwtGuard)
	@Get('gradebook/:id')
	async getGradebook(
		@Req() request: RequestWithUser<JwtPayloadDto>,
		@Param('id') id: string,
		@Query() dateRange: DateRangeDto
	) {
		return this.ratingService.getTeacherRating(request.user.id, id, dateRange);
	}

	@UseGuards(TeacherJwtGuard)
	@Post('add-rating-column')
	async addRatingColumn(
		@Req() request: RequestWithUser<JwtPayloadDto>,
		@Body() dto: AddRatingColumnDto
	) {
		return this.ratingService.addRatingColumn(request.user.id, dto);
	}

	@UseGuards(TeacherJwtGuard)
	@Delete('remove-rating-column')
	async removeRatingColumn(
		@Req() request: RequestWithUser<JwtPayloadDto>,
		@Body() dto: RemoveRatingColumnDto
	) {
		return this.ratingService.removeRatingColumn(request.user.id, dto.ratingIds);
	}

	@UseGuards(TeacherJwtGuard)
	@Patch('update-date-rating-column')
	async updateDateRatingColumn(
		@Req() request: RequestWithUser<JwtPayloadDto>,
		@Body() dto: UpdateDateRatingColumnDto
	) {
		return this.ratingService.updateDateRatingColumn(request.user.id, dto);
	}

	@UseGuards(TeacherJwtGuard)
	@Patch('update-description-rating-column')
	async updateDescriptionRatingColumn(
		@Req() request: RequestWithUser<JwtPayloadDto>,
		@Body() dto: UpdateDescriptionRatingColumnDto
	) {
		return this.ratingService.updateDescriptionRatingColumn(request.user.id, dto);
	}

	@UseGuards(TeacherJwtGuard)
	@Patch('update-rating')
	async updateRating(
		@Req() request: RequestWithUser<JwtPayloadDto>,
		@Body() dto: UpdateRatingDto
	) {
		return this.ratingService.updateRating(request.user.id, dto);
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

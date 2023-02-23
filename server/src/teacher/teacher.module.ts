import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherEntity } from './teacher.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TeacherJwtAtStrategy } from './strategies/teacher-jwt-at.strategy';
import { TeacherJwtRtStrategy } from './strategies/teacher-jwt-rt.strategy';
import { EducationEntity } from '../education/education.entity';
import { RatingService } from '../rating/rating.service';
import { RatingEntity } from '../rating/rating.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([TeacherEntity, EducationEntity, RatingEntity]),
		JwtModule.register({}),
		PassportModule,
		ConfigModule
	],
	controllers: [TeacherController, AuthController],
	providers: [
		TeacherService,
		AuthService,
		RatingService,
		TeacherJwtAtStrategy,
		TeacherJwtRtStrategy
	]
})
export class TeacherModule {}

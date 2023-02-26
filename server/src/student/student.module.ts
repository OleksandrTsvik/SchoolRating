import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentJwtAtStrategy } from './strategies/student-jwt-at.strategy';
import { StudentJwtRtStrategy } from './strategies/student-jwt-rt.strategy';
import { RatingService } from '../rating/rating.service';
import { EducationEntity } from '../education/education.entity';
import { RatingEntity } from '../rating/rating.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([StudentEntity, RatingEntity, EducationEntity]),
		JwtModule.register({}),
		PassportModule,
		ConfigModule
	],
	controllers: [StudentController, AuthController],
	providers: [
		StudentService,
		AuthService,
		RatingService,
		StudentJwtAtStrategy,
		StudentJwtRtStrategy
	]
})
export class StudentModule {}

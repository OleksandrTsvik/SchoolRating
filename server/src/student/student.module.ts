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

@Module({
	imports: [
		TypeOrmModule.forFeature([StudentEntity]),
		JwtModule.register({}),
		PassportModule,
		ConfigModule
	],
	controllers: [StudentController, AuthController],
	providers: [StudentService, AuthService, StudentJwtAtStrategy, StudentJwtRtStrategy]
})
export class StudentModule {}

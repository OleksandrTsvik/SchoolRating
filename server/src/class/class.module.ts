import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassEntity } from './class.entity';
import { StudentEntity } from '../student/student.entity';
import { StudentService } from '../student/student.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ClassEntity, StudentEntity]),
		JwtModule.register({})
	],
	controllers: [ClassController],
	providers: [ClassService, StudentService]
})
export class ClassModule {}

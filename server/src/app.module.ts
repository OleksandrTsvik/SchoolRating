import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postrgres.config';
import { AdminModule } from './admin/admin.module';
import { validationSchemaConfig } from './configs/validation-schema.config';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';
import { EducationModule } from './education/education.module';
import { RatingModule } from './rating/rating.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: validationSchemaConfig
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getPostgresConfig
		}),
		AdminModule,
		StudentModule,
		SubjectModule,
		TeacherModule,
		ClassModule,
		EducationModule,
		RatingModule
	]
})
export class AppModule {}

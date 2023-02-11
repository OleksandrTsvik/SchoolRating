import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postrgres.config';
import { AdminModule } from './admin/admin.module';
import { validationSchemaConfig } from './configs/validation-schema.config';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

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
		TeacherModule
	]
})
export class AppModule {}

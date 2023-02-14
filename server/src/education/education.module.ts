import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { EducationEntity } from './education.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([EducationEntity]),
		JwtModule.register({})
	],
	controllers: [EducationController],
	providers: [EducationService]
})
export class EducationModule {}

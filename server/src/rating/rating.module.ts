import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RatingEntity } from './rating.entity';
import { EducationEntity } from '../education/education.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([RatingEntity, EducationEntity])
	],
	controllers: [RatingController],
	providers: [RatingService]
})
export class RatingModule {}

import { IsDateString, IsUUID } from 'class-validator';

export class UpdateDateRatingColumnDto {
	@IsUUID(undefined, { each: true })
	studentIds: string[];

	@IsUUID(undefined, { each: true })
	ratingIds: string[];

	@IsDateString()
	date: Date;
}
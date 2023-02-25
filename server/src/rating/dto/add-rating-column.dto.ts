import { IsDateString, IsUUID } from 'class-validator';

export class AddRatingColumnDto {
	@IsUUID(undefined, { each: true })
	studentIds: string[];

	@IsUUID()
	educationId: string;

	@IsDateString()
	date: Date;
}
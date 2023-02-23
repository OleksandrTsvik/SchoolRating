import { IsDateString, IsUUID } from 'class-validator';

export class AddRatingColumnDto {
	@IsUUID()
	educationId: string;

	@IsDateString()
	date: Date;
}
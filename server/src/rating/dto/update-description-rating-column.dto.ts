import { IsOptional, IsUUID, Length } from 'class-validator';

export class UpdateDescriptionRatingColumnDto {
	@IsUUID(undefined, { each: true })
	ratingIds: string[];

	@IsOptional()
	@Length(0, 64, { message: 'Опис оцінки не має перевищувати 64 символи' })
	description?: string;
}
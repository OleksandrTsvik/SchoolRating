import { IsUUID } from 'class-validator';

export class RemoveRatingColumnDto {
	@IsUUID(undefined, { each: true })
	ratingIds: string[];
}
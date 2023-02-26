import { IsBoolean, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class UpdateRatingDto {
	@IsUUID()
	id: string;

	@IsBoolean()
	isPresence: boolean;

	@IsOptional()
	@IsInt({ message: 'Оцінка має бути цілим числом' })
	@Min(1, { message: 'Оцінка може бути в межах 1 - 12' })
	@Max(12, { message: 'Оцінка може бути в межах 1 - 12' })
	mark: number | null;
}
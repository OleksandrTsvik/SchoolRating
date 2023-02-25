import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeDto {
	@IsOptional()
	@IsDateString()
	start?: Date;

	@IsOptional()
	@IsDateString()
	end?: Date;
}
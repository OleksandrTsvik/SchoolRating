import { Controller, Get } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
	constructor(
		private readonly ratingService: RatingService
	) {}

	@Get('descriptions')
	async getDistinctDescriptions() {
		return this.ratingService.getDistinctDescriptions();
	}
}

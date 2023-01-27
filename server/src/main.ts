import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AdminSeedService } from './admin/admin.seed.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors();

	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe());

	app.get(AdminSeedService);

	await app.listen(3001);
}

bootstrap();

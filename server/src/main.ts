import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AdminSeedService } from './admin/admin.seed.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');

	app.enableCors({
		origin: configService.get('FRONTEND_URL'),
		credentials: true,
	});

	app.use(cookieParser());

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.useGlobalPipes(new ValidationPipe());

	app.get(AdminSeedService);

	await app.listen(3001);
}

bootstrap();

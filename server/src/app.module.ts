import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPostgresConfig } from './configs/postrgres.config';
import { AdminModule } from './admin/admin.module';
import { validationSchemaConfig } from './configs/validation-schema.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: validationSchemaConfig
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getPostgresConfig
		}),
		AdminModule
	]
})
export class AppModule {}

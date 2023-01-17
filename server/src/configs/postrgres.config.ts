import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdminModel } from '../admin/admin.model';

export async function getPostgresConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
	return {
		type: 'postgres',
		host: configService.get('POSTGRES_HOST'),
		port: configService.get('POSTGRES_PORT'),
		username: configService.get('POSTGRES_USERNAME'),
		password: configService.get('POSTGRES_PASSWORD'),
		database: configService.get('POSTGRES_DATABASE'),
		// entities: [__dirname + '/../**/*.entity.{js,ts}'],
		entities: [AdminModel],
		synchronize: true
	};
}
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { AdminEntity } from '../admin/admin.entity';

export async function getPostgresConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
	return {
		type: 'postgres',
		host: configService.get('POSTGRES_HOST'),
		port: configService.get('POSTGRES_PORT'),
		username: configService.get('POSTGRES_USERNAME'),
		password: configService.get('POSTGRES_PASSWORD'),
		database: configService.get('POSTGRES_DATABASE'),
		entities: [__dirname + '/../**/*.entity.{js,ts}'],
		// entities: [AdminModel],
		synchronize: true,
		// logging: true // запити до БД в терміналі
	};
}
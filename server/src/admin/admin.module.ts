import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminModel } from './admin.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getJwtConfig } from '../configs/jwt.config';
import { JwtAdminStrategy } from '../authorization/strategies/jwt.admin.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([AdminModel]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		PassportModule,
		ConfigModule
	],
	controllers: [AdminController, AuthController],
	providers: [AdminService, AuthService, JwtAdminStrategy]
})
export class AdminModule {}

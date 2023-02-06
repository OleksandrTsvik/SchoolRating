import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminJwtAtStrategy } from './strategies/admin-jwt-at.strategy';
import { AdminJwtRtStrategy } from './strategies/admin-jwt-rt.strategy';
import { AdminSeedService } from './admin.seed.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([AdminEntity]),
		JwtModule.register({}),
		PassportModule,
		ConfigModule
	],
	controllers: [AdminController, AuthController],
	providers: [
		AdminService,
		AuthService,
		AdminJwtAtStrategy,
		AdminJwtRtStrategy,
		AdminSeedService
	]
})
export class AdminModule {}

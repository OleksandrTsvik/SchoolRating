import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModel } from './admin.model';

@Module({
	imports: [TypeOrmModule.forFeature([AdminModel])],
	controllers: [AdminController],
	providers: [AdminService]
})
export class AdminModule {}

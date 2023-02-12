import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassEntity } from './class.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ClassEntity]),
		JwtModule.register({})
	],
	controllers: [ClassController],
	providers: [ClassService]
})
export class ClassModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectEntity } from './subject.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([SubjectEntity]),
		JwtModule.register({})
	],
	controllers: [SubjectController],
	providers: [SubjectService]
})
export class SubjectModule {}

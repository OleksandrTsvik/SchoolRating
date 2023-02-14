import { IsUUID } from 'class-validator';

export class EducationDto {
	@IsUUID()
	teacherId: string;

	@IsUUID()
	classId: string;

	@IsUUID()
	subjectId: string;
}
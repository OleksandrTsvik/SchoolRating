import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SubjectDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 64, { message: 'Назва предмета повинна містити до 64 символів' })
	name: string;
}
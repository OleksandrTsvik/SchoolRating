import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SubjectDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 64, { message: 'Назва предмета має бути від 6 до 64 символів' })
	name: string;
}
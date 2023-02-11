import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 32, { message: 'Ім\'я повинне містити до 32-х символів' })
	firstName: string;

	@IsNotEmpty()
	@IsString()
	@Length(1, 32, { message: 'Прізвище повинне містити до 32-х символів' })
	lastName: string;

	@IsNotEmpty()
	@IsString()
	@Length(1, 32, { message: 'По батькові повинне містити до 32-х символів' })
	patronymic: string;

	@IsNotEmpty()
	@IsEmail({}, { message: 'Некоректна електронна адреса' })
	email: string;

	@IsOptional()
	@Length(6, 32, { message: 'Довжина пароля має бути від 6 до 32 символів' })
	password?: string;
}
import { IsEmail, IsString, Length } from 'class-validator';

export class AdminDto {
	@IsEmail({}, { message: 'Некоректна електронна адреса' })
	email: string;

	@IsString()
	@Length(6, 32, { message: 'Довжина пароля має бути від 6 до 32 символів' })
	password: string;
}
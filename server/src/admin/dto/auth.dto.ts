import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
	@IsNotEmpty()
	@IsEmail({}, { message: 'Некоректна електронна адреса' })
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 32, { message: 'Довжина пароля має бути від 6 до 32 символів' })
	password: string;
}
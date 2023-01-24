import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDto {
	@IsOptional()
	@IsEmail({}, { message: 'Некоректна електронна адреса' })
	email?: string;

	@IsOptional()
	@IsString()
	@Length(6, 32, { message: 'Довжина пароля має бути від 6 до 32 символів' })
	password?: string;
}
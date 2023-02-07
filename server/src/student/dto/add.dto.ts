import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class AddDto {
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

	@IsNotEmpty()
	@IsString()
	@Length(6, 32, { message: 'Довжина пароля має бути від 6 до 32 символів' })
	password: string;
}
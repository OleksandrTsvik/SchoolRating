import { IsString, Length } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class ChangePasswordDto {
	@IsString({ message: 'Поле "Поточний пароль" є обов\'язковим' })
	currentPassword: string;

	@IsString({ message: 'Поле "Новий пароль" є обов\'язковим' })
	@Length(6, 32, { message: 'Довжина нового пароля має бути від 6 до 32 символів' })
	newPassword: string;

	@IsString()
	@Match('newPassword', { message: 'Паролі не співпадають' })
	confirmPassword: string;
}
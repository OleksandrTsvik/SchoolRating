import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ClassDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 8, { message: 'Назва класу не повинна перевищувати 8-ми символів' })
	name: string;
}
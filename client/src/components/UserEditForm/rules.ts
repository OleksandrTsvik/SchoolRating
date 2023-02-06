import { Rule } from 'antd/es/form';

interface Rules {
	firstName: Rule[];
	lastName: Rule[];
	patronymic: Rule[];
	email: Rule[];
	password: Rule[];
}

export const rules: Rules = {
	firstName: [
		{
			required: true,
			message: 'Поле "Ім\'я" є обов\'язковим',
		},
		{
			max: 32,
			message: 'Довжина поля "Ім\'я" не повинна перевищувати 32 символи',
		}
	],
	lastName: [
		{
			required: true,
			message: 'Поле "Прізвище" є обов\'язковим',
		},
		{
			max: 32,
			message: 'Довжина поля "Прізвище" не повинна перевищувати 32 символи',
		}
	],
	patronymic: [
		{
			required: true,
			message: 'Поле "По батькові" є обов\'язковим',
		},
		{
			max: 32,
			message: 'Довжина поля "По батькові" не повинна перевищувати 32 символи',
		}
	],
	email: [
		{
			required: true,
			type: 'email',
			message: 'Введіть дійсну адресу електронної пошти'
		}
	],
	password: [
		// {
		// 	required: true,
		// 	message: 'Введіть свій пароль'
		// },
		{
			min: 6,
			max: 32,
			message: 'Довжина пароля має бути від 6 до 32 символів'
		}
	]
};
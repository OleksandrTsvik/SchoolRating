import { Rule } from 'antd/es/form';

interface Rules {
	email: Rule[];
	password: Rule[];
}

export const rules: Rules = {
	email: [
		{
			required: true,
			type: 'email',
			message: 'Введіть дійсну адресу електронної пошти'
		}
	],
	password: [
		{
			required: true,
			message: 'Введіть свій пароль'
		},
		{
			min: 6,
			max: 32,
			message: 'Довжина пароля має бути від 6 до 32 символів'
		}
	]
};
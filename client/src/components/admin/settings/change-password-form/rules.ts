import { Rule } from "antd/es/form";

interface Rules {
	currentPassword: Rule[];
	newPassword: Rule[];
	confirmPassword: Rule[];
}

export const rules: Rules = {
	currentPassword: [
		{
			required: true,
			message: 'Введіть поточний пароль'
		}
	],
	newPassword: [
		{
			required: true,
			message: 'Введіть новий пароль'
		},
		{
			min: 6,
			max: 32,
			message: 'Довжина пароля має бути від 6 до 32 символів'
		}
	],
	confirmPassword: [
		{
			required: true,
			message: 'Введіть новий пароль ще раз'
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('newPassword') === value) {
					return Promise.resolve();
				}
				return Promise.reject(new Error('Паролі не співпадають'));
			}
		})
	]
};
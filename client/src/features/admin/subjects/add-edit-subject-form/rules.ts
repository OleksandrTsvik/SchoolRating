import { Rule } from 'antd/es/form';

interface Rules {
	name: Rule[];
}

export const rules: Rules = {
	name: [
		{
			required: true,
			message: 'Поле "Назва предмету" є обов\'язковим'
		},
		{
			min: 1,
			max: 64,
			message: 'Назва предмета має бути від 6 до 64 символів'
		}
	]
};
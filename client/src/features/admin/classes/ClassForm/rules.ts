import { Rule } from 'antd/es/form';

interface Rules {
	name: Rule[];
}

export const rules: Rules = {
	name: [
		{
			required: true,
			message: 'Поле "Назва класу" є обов\'язковим'
		},
		{
			min: 1,
			max: 8,
			message: 'Назва класу не повинна перевищувати 8-ми символів'
		}
	]
};
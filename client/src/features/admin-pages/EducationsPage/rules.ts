import { Rule } from 'antd/es/form';

interface Rules {
	teacherId: Rule[];
	classId: Rule[];
	subjectId: Rule[];
}

export const rules: Rules = {
	teacherId: [
		{
			required: true,
			message: 'Виберіть учителя'
		}
	],
	classId: [
		{
			required: true,
			message: 'Виберіть клас'
		}
	],
	subjectId: [
		{
			required: true,
			message: 'Виберіть предмет'
		}
	],
};
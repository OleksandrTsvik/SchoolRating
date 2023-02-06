import { ColumnsType } from 'antd/es/table';
import Moment from 'moment/moment';

export interface DataType {
	id: string;
	number: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
}

export const columns: ColumnsType<DataType> = [
	{ dataIndex: 'number', title: '#', width: 20, className: 'text-center' },
	{ dataIndex: 'firstName', title: 'Ім\'я' },
	{ dataIndex: 'lastName', title: 'Прізвище' },
	{ dataIndex: 'patronymic', title: 'По батькові' },
	{ dataIndex: 'email', title: 'Email' },
	{
		dataIndex: 'createdAt',
		title: 'Дата реєстрації',
		render: (_, record) => Moment(record.createdAt).format('DD.MM.YYYY HH:mm')
	}
];
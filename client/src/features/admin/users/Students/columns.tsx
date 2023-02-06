import { ColumnsType } from 'antd/es/table';
import Moment from 'moment/moment';
import { Space } from 'antd';

import ActionButton from '../../../../components/ActionButton';

export interface DataType {
	id: string;
	number: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
	onClickDelete: () => void;
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
	},
	{
		key: 'action',
		className: 'text-center',
		width: 120,
		render: (_, record) => (
			<Space size="small">
				<ActionButton
					action={'edit'}
					onClick={() => console.log('edit')}
				/>
				< ActionButton
					action={'delete'}
					onClick={record.onClickDelete}
				/>
			</Space>
		)
	}
];
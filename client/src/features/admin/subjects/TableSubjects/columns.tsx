import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

import ActionButton from '../../../../components/ActionButton';

export interface DataType {
	id: string;
	number: number;
	name: string;
	onClickDelete: () => void;
	onClickEdit: () => void;
}

export const columns: ColumnsType<DataType> = [
	{ title: '#', dataIndex: 'number', width: 20, className: 'text-center' },
	{ title: 'Name', dataIndex: 'name' },
	{
		key: 'action',
		className: 'text-center',
		width: 120,
		render: (_, record) => (
			<Space size="small">
				<ActionButton
					action={'edit'}
					onClick={record.onClickEdit}
				/>
				<ActionButton
					action={'delete'}
					onClick={record.onClickDelete}
				/>
			</Space>
		)
	}
];
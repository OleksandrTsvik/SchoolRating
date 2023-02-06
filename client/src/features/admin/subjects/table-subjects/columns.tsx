import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

import EditSubject from '../edit-subject/EditSubject';
import DeleteSubject from '../delete-subject/DeleteSubject';

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
				<EditSubject
					onClick={record.onClickEdit}
				/>
				<DeleteSubject
					id={record.id}
					name={record.name}
					onClick={record.onClickDelete}
				/>
			</Space>
		)
	}
];
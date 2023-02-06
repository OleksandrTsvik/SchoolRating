import { ColumnsType } from 'antd/es/table';

export interface DataType {
	id: string;
	email: string;
}

export const columns: ColumnsType<DataType> = [
	{ dataIndex: 'id', title: 'id', width: 320 },
	{ dataIndex: 'email', title: 'Email' },
];
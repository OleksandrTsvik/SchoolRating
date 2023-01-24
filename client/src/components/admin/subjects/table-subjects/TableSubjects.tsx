import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
	key: string;
	number: number;
	name: string;
}

const columns: ColumnsType<DataType> = [
	{
		title: '#',
		dataIndex: 'number',
	},
	{
		title: 'Name',
		dataIndex: 'name',
	},
];

const data: DataType[] = [
	{
		key: '1',
		number: 1,
		name: 'John Brown',
	},
	{
		key: '2',
		number: 2,
		name: 'Jim Green',
	},
	{
		key: '3',
		number: 3,
		name: 'Joe Black',
	},
];

export default function TableSubjects() {
	return (
		<Table
			bordered
			columns={columns}
			dataSource={data}
		/>
	);
}
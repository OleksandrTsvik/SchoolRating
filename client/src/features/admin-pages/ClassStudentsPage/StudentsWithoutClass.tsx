import { useState } from 'react';
import { Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';

import { ApiError } from '../../../api/config';
import { useAddStudentMutation, useGetStudentsWithoutClassQuery } from '../../../api/services/classService';
import useColumnSearchProps from '../../../hooks/useColumnSearchProps';
import FailedRequest from '../../../components/FailedRequest';
import ActionButton from '../../../components/ActionButton';

interface DataType {
	id: string;
	number: number;
	firstName: string;
	lastName: string;
	patronymic: string;
}

interface Props {
	classId: string;
}

export default function StudentsWithoutClass({ classId }: Props) {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const { filters, getColumnSearchProps } = useColumnSearchProps<DataType>({
		firstName: null,
		lastName: null,
		patronymic: null,
		email: null
	});
	const { data, isFetching, error, refetch } = useGetStudentsWithoutClassQuery({ page, limit, ...filters });

	const [addStudent] = useAddStudentMutation();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	const columns: ColumnsType<DataType> = [
		{
			title: '#',
			dataIndex: 'number',
			width: 20,
			className: 'text-center'
		},
		{
			title: 'Ім\'я',
			dataIndex: 'firstName',
			...getColumnSearchProps('firstName', 'Ім\'я')
		},
		{
			title: 'Прізвище',
			dataIndex: 'lastName',
			...getColumnSearchProps('lastName', 'Прізвище')
		},
		{
			title: 'По батькові',
			dataIndex: 'patronymic',
			...getColumnSearchProps('patronymic', 'По батькові')
		},
		{
			key: 'action',
			className: 'text-center',
			width: 72,
			render: (_, record) => (
				<Space size="small">
					<ActionButton
						action="plus"
						onClick={async () => await addStudent({ classId, studentId: record.id }).unwrap()}
					/>
				</Space>
			)
		}
	];

	return (
		<>
			<Title level={2} className="text-center">
				Учні без класу ({data ? data.total : 0})
			</Title>
			<div className="table-responsive">
				<Table
					bordered
					loading={isFetching}
					pagination={{
						pageSize: limit,
						total: data ? data.total : 0,
						showSizeChanger: true,
						pageSizeOptions: [2, 5, 10, 20, 50, 100],
						responsive: true,
						showTotal: (total) => `Всього ${total} учнів`,
						onChange: (page, pageSize) => {
							setPage(page);
							setLimit(pageSize);
						}
					}}
					columns={columns}
					dataSource={!data ? []
						: data.data.map((student, index) => ({
							...student,
							key: student.id,
							number: limit * (page - 1) + index + 1
						}))
					}
				/>
			</div>
		</>
	);
}
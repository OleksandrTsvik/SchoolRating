import { useParams } from 'react-router-dom';
import { Empty, Space, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { ColumnsType } from 'antd/es/table';

import { ApiError } from '../../../api/config';
import { useGetClassQuery, useRemoveStudentMutation } from '../../../api/services/classService';
import FailedRequest from '../../../components/FailedRequest';
import ActionButton from '../../../components/ActionButton';
import LoadingTable from '../../../components/LoadingTable';
import StudentsWithoutClass from './StudentsWithoutClass';

interface DataType {
	id: string;
	number: number;
	firstName: string;
	lastName: string;
	patronymic: string;
}

export default function ClassStudentsPage() {
	const { id } = useParams();

	const { data, isLoading, isFetching, error, refetch } = useGetClassQuery({ id: id as string });
	const [removeStudent, { isLoading: isRemoveStudentLoading }] = useRemoveStudentMutation();

	document.title = `Учні в класі ${data?.name}`;

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
		{ title: 'Ім\'я', dataIndex: 'firstName' },
		{ title: 'Прізвище', dataIndex: 'lastName' },
		{ title: 'По батькові', dataIndex: 'patronymic' },
		{
			key: 'action',
			className: 'text-center',
			width: 72,
			render: (_, record) => (
				<Space size="small">
					<ActionButton
						action="minus"
						onClick={async () => await removeStudent({ studentId: record.id }).unwrap()}
					/>
				</Space>
			)
		}
	];

	if (isLoading) {
		return <LoadingTable columns={columns} />;
	}

	if (!data) {
		return <Empty description="Дані про клас відсутній" />;
	}

	return (
		<>
			<Title level={2} className="text-center">
				Учні в класі {data.name} ({data.students.length})
			</Title>
			<div className="table-responsive">
				<Table
					bordered
					pagination={false}
					loading={isRemoveStudentLoading || isFetching}
					columns={columns}
					dataSource={data.students.map((student, index) => ({
						...student,
						key: student.id,
						number: index + 1
					}))}
				/>
			</div>
			<StudentsWithoutClass classId={data.id} />
		</>
	);
}
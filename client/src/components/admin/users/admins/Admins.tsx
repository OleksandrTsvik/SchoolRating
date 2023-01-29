import { Empty, Skeleton } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import { useGetAdminsQuery } from '../../../../api/services/adminService';
import FailedRequest from '../FailedRequest';
import { ApiError } from '../../../../api/config';

interface DataType {
	key: string;
	id: string;
	email: string;
}

const columns: ColumnsType<DataType> = [
	{ dataIndex: 'id', title: 'id' },
	{ dataIndex: 'email', title: 'email' },
];

export default function Admins() {
	const { data, isLoading, error, refetch } = useGetAdminsQuery();

	if (error) {
		return <FailedRequest loading={isLoading} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<Table
			bordered
			pagination={false}
			columns={columns}
			dataSource={data.map(admin => ({
				...admin,
				key: admin.id
			}))}
		/>
	);
}
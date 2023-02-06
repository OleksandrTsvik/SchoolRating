import { Empty, Skeleton } from 'antd';
import Table from 'antd/es/table';

import FailedRequest from '../FailedRequest';
import { ApiError } from '../../../../api/config';
import { useGetStudentsQuery } from '../../../../api/services/adminStudentService';
import { columns } from './columns';

export default function Students() {
	const { data, isLoading, error, refetch } = useGetStudentsQuery();

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
		<div className="table-responsive">
			<Table
				bordered
				pagination={false}
				columns={columns}
				dataSource={data.map((admin, index) => ({
					...admin,
					key: admin.id,
					number: index + 1
				}))}
			/>
		</div>
	);
}
import { Empty, Skeleton } from 'antd';
import Table from 'antd/es/table';

import { useGetAdminsQuery } from '../../../../api/services/adminService';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import FailedRequest from '../../../../components/FailedRequest';
import { ApiError } from '../../../../api/config';
import { useAppSelector } from '../../../../store';
import AddAdmin from './AddAdmin';
import { columns } from './columns';

import styles from './Admins.module.scss';

export default function Admins() {
	const admin = useAppSelector(selectCurrentAdmin);
	const { data, isFetching, error, refetch } = useGetAdminsQuery();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isFetching) {
		return <Skeleton active />;
	}

	if (!data) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			<AddAdmin />
			<div className="table-responsive">
				<Table
					bordered
					rowClassName={(record) => record.id === admin.id ? styles.rowCurrentAdmin : ''}
					pagination={false}
					columns={columns}
					dataSource={data.map(admin => ({
						...admin,
						key: admin.id
					}))}
				/>
			</div>
		</>
	);
}
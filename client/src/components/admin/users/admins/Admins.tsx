import { Empty, Skeleton } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import { useGetAdminsQuery } from '../../../../api/services/adminService';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import FailedRequest from '../FailedRequest';
import { ApiError } from '../../../../api/config';
import { useAppSelector } from '../../../../store';
import AddAdmin from './AddAdmin';

import styles from './Admins.module.scss';

interface DataType {
	id: string;
	email: string;
}

const columns: ColumnsType<DataType> = [
	{ dataIndex: 'id', title: 'id' },
	{ dataIndex: 'email', title: 'email' },
];

export default function Admins() {
	const admin = useAppSelector(selectCurrentAdmin);
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
		<>
			<AddAdmin />
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
		</>
	);
}
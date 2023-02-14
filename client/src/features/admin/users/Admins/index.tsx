import { Empty } from 'antd';
import Table from 'antd/es/table';

import { useGetAdminsQuery } from '../../../../api/services/adminService';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import FailedRequest from '../../../../components/FailedRequest';
import { ApiError } from '../../../../api/config';
import { useAppSelector } from '../../../../store';
import AddAdmin from './AddAdmin';
import { columns } from './columns';

import styles from './Admins.module.scss';
import LoadingTable from '../../../../components/LoadingTable';
import React from 'react';

export default function Admins() {
	const admin = useAppSelector(selectCurrentAdmin);
	const { data, isLoading, isFetching, error, refetch } = useGetAdminsQuery();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <LoadingTable columns={columns} />;
	}

	if (!data) {
		return (
			<>
				<AddAdmin />
				<Empty className="mt-4" description="Дані відсутні" />
			</>
		);
	}

	return (
		<>
			<AddAdmin />
			<div className="table-responsive">
				<Table
					bordered
					rowClassName={(record) => record.id === admin.id ? styles.rowCurrentAdmin : ''}
					pagination={false}
					loading={isFetching}
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
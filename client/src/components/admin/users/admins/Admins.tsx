import { Button, Empty, Result, Skeleton } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import { useGetAdminsQuery } from "../../../../api/services/adminService";
import { ApiError } from '../../../../api/config';
import RenderError from '../../../../utils/RenderError';
import React from 'react';

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
		return (
			<Result
				status="error"
				title={<RenderError
					error={error as ApiError}
					message="Виникла помилка під час завантаження даних"
				/>}
				extra={[
					<Button key="refetch" loading={isLoading} onClick={refetch}>
						Надіслати повторний запит
					</Button>
				]}
			/>
		);
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
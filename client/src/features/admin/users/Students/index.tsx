import { Empty, Modal, Skeleton } from 'antd';
import Table from 'antd/es/table';
import { WarningOutlined } from '@ant-design/icons';

import FailedRequest from '../FailedRequest';
import { ApiError } from '../../../../api/config';
import { useDeleteMutation, useGetStudentsQuery } from '../../../../api/services/adminStudentService';
import { columns } from './columns';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import getFullName from '../../../../utils/getFullName';

const { confirm } = Modal;

export default function Students() {
	const { data, isLoading, error, refetch } = useGetStudentsQuery();

	const [deleteStudent] = useDeleteMutation();

	if (error) {
		return <FailedRequest loading={isLoading} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data) {
		return <Empty description="Дані відсутні" />;
	}

	async function onDeleteStudent(id: string, name: string) {
		await transactionWithNotification(
			async () => {await deleteStudent({ id }).unwrap()},
			`Учня "${name}" успішно видалено`,
			`Виникла помилка під час видалення учня "${name}"`
		);
	}

	function showDeleteConfirm(id: string, fullName: string) {
		confirm({
			type: 'warning',
			title: 'Видалити учня?',
			icon: <WarningOutlined />,
			content: (
				<>
					<p>Ви дійсно бажаєте видалити учня "{fullName}"?</p>
					<p className="text-muted">Дану дію скасувати неможливо.</p>
				</>
			),
			okText: 'Так, видалити',
			okType: 'danger',
			cancelText: 'Скасувати',
			onOk: () => onDeleteStudent(id, fullName)
		});
	}

	return (
		<div className="table-responsive">
			<Table
				bordered
				pagination={false}
				columns={columns}
				dataSource={data.map((student, index) => ({
					...student,
					key: student.id,
					number: index + 1,
					onClickDelete: () => showDeleteConfirm(student.id, getFullName(student))
				}))}
			/>
		</div>
	);
}
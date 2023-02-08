import { useState } from 'react';
import { Empty, Form, Modal, Skeleton } from 'antd';
import Table from 'antd/es/table';

import FailedRequest from '../FailedRequest';
import { ApiError } from '../../../../api/config';
import { useDeleteMutation, useEditMutation, useGetStudentsQuery } from '../../../../api/services/adminStudentService';
import { columns } from './columns';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import getFullName from '../../../../utils/getFullName';
import confirmDelete from '../../../../utils/confirmDelete';
import useModal from '../../../../hooks/useModal';
import UserForm, { FormValues } from '../../../../components/UserForm';
import { IStudent } from '../../../../models/IStudent';
import AddStudent from './AddStudent';

export default function Students() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { data, isLoading, error, refetch } = useGetStudentsQuery({ page, limit });

	const { isOpen, onOpen, onClose } = useModal();
	const [formEditStudent] = Form.useForm<FormValues>();
	const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
	const [editStudent, { isLoading: isEditLoading }] = useEditMutation();

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

	async function onDeleteStudent(id: string, fullName: string) {
		await transactionWithNotification(
			async () => {await deleteStudent({ id }).unwrap()},
			`Учня "${fullName}" успішно видалено`,
			`Виникла помилка під час видалення учня "${fullName}"`
		);
	}

	function showDeleteConfirm(id: string, fullName: string) {
		confirmDelete(
			'Видалити учня?',
			`Ви дійсно бажаєте видалити учня "${fullName}"?`,
			() => onDeleteStudent(id, fullName)
		);
	}

	async function onEditStudent(values: FormValues) {
		await transactionWithNotification(
			async () => {
				if (!selectedEditId) {
					throw new Error();
				}

				await editStudent({ ...values, id: selectedEditId }).unwrap();
				setSelectedEditId(null);
				onClose();
			},
			'Дані учня успішно змінено',
			'Виникла помилка при зміні даних учня'
		);
	}

	function onClickEdit(student: IStudent) {
		formEditStudent.resetFields();
		formEditStudent.setFieldsValue(student);

		setSelectedEditId(student.id);
		onOpen();
	}

	return (
		<>
			<AddStudent />
			<div className="table-responsive">
				<Table
					bordered
					pagination={{
						pageSize: limit,
						total: data.total,
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
					dataSource={data.data.map((student, index) => ({
						...student,
						key: student.id,
						number: limit * (page - 1) + index + 1,
						onClickEdit: () => onClickEdit(student),
						onClickDelete: () => showDeleteConfirm(student.id, getFullName(student)),
					}))}
				/>
			</div>
			<Modal
				title="Редагування даних учня"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти зміни"
				cancelText="Скасувати"
				confirmLoading={isEditLoading}
				onOk={formEditStudent.submit}
			>
				<UserForm
					form={formEditStudent}
					onFinish={onEditStudent}
				/>
			</Modal>
		</>
	);
}
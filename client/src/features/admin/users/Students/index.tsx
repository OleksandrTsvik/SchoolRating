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
import UserEditForm, { FormValues } from '../../../../components/UserEditForm';
import { IStudent } from '../../../../models/IStudent';

export default function Students() {
	const { data, isLoading, error, refetch } = useGetStudentsQuery();

	const { isOpen, onOpen, onClose } = useModal();
	const [formEditStudent] = Form.useForm();
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

		formEditStudent.setFieldValue('firstName', student.firstName);
		formEditStudent.setFieldValue('lastName', student.lastName);
		formEditStudent.setFieldValue('patronymic', student.patronymic);
		formEditStudent.setFieldValue('email', student.email);

		setSelectedEditId(student.id);
		onOpen();
	}

	return (
		<>
			<div className="table-responsive">
				<Table
					bordered
					pagination={false}
					columns={columns}
					dataSource={data.map((student, index) => ({
						...student,
						key: student.id,
						number: index + 1,
						onClickEdit: () => onClickEdit(student),
						onClickDelete: () => showDeleteConfirm(student.id, getFullName(student)),
					}))}
				/>
			</div>
			<Modal
				title="Редагування предмету"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти зміни"
				cancelText="Скасувати"
				confirmLoading={isEditLoading}
				onOk={formEditStudent.submit}
			>
				<UserEditForm
					form={formEditStudent}
					onFinish={onEditStudent}
				/>
			</Modal>
		</>
	);
}
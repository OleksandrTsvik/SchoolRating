import React, { useState } from 'react';
import { Form, Modal, Space } from 'antd';
import Moment from 'moment';
import Table, { ColumnsType } from 'antd/es/table';

import { ApiError } from '../../../../api/config';
import {
	useAddMutation,
	useDeleteMutation,
	useEditMutation,
	useGetTeachersQuery
} from '../../../../api/services/adminTeacherService';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import getFullName from '../../../../utils/getFullName';
import confirmDelete from '../../../../utils/confirmDelete';
import useModal from '../../../../hooks/useModal';
import useColumnSearchProps from '../../../../hooks/useColumnSearchProps';
import UserForm, { FormValues } from '../../../../components/UserForm';
import ActionButton from '../../../../components/ActionButton';
import AddUser from '../../../../components/AddUser';
import FailedRequest from '../../../../components/FailedRequest';

interface DataType {
	id: string;
	number: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
}

export default function Teachers() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const { filters, getColumnSearchProps } = useColumnSearchProps<DataType>({
		firstName: null,
		lastName: null,
		patronymic: null,
		email: null
	});
	const { data, isFetching, error, refetch } = useGetTeachersQuery({ page, limit, ...filters });

	const [addTeacher, { isLoading: isAddLoading }] = useAddMutation();

	const { isOpen, onOpen, onClose } = useModal();
	const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
	const [formEditTeacher] = Form.useForm<FormValues>();
	const [editTeacher, { isLoading: isEditLoading }] = useEditMutation();

	const [deleteTeacher] = useDeleteMutation();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	async function onDeleteTeacher(id: string, fullName: string) {
		await transactionWithNotification(
			async () => {await deleteTeacher({ id }).unwrap()},
			`Учителя "${fullName}" успішно видалено`,
			`Виникла помилка під час видалення учителя "${fullName}"`
		);
	}

	function showDeleteConfirm(id: string, fullName: string) {
		confirmDelete(
			'Видалити учителя?',
			`Ви дійсно бажаєте видалити учителя "${fullName}"?`,
			() => onDeleteTeacher(id, fullName)
		);
	}

	async function submitEditTeacher(values: FormValues) {
		await transactionWithNotification(
			async () => {
				if (!selectedEditId) {
					throw new Error();
				}

				await editTeacher({ ...values, id: selectedEditId }).unwrap();
				setSelectedEditId(null);
				onClose();
			},
			'Дані учителя успішно змінено',
			'Виникла помилка при зміні даних учителя'
		);
	}

	function onClickEdit(teacher: DataType) {
		formEditTeacher.resetFields();
		formEditTeacher.setFieldsValue(teacher);

		setSelectedEditId(teacher.id);
		onOpen();
	}

	const columns: ColumnsType<DataType> = [
		{
			title: '#',
			dataIndex: 'number',
			width: 20,
			className: 'text-center'
		},
		{
			title: 'Ім\'я',
			dataIndex: 'firstName',
			...getColumnSearchProps('firstName', 'Ім\'я')
		},
		{
			title: 'Прізвище',
			dataIndex: 'lastName',
			...getColumnSearchProps('lastName', 'Прізвище')
		},
		{
			title: 'По батькові',
			dataIndex: 'patronymic',
			...getColumnSearchProps('patronymic', 'По батькові')
		},
		{
			title: 'Email',
			dataIndex: 'email',
			...getColumnSearchProps('email')
		},
		{
			title: 'Дата реєстрації',
			dataIndex: 'createdAt',
			render: (_, record) => Moment(record.createdAt).format('DD.MM.YYYY HH:mm')
		},
		{
			key: 'action',
			className: 'text-center',
			width: 120,
			render: (_, record) => (
				<Space size="small">
					<ActionButton
						action="edit"
						onClick={() => onClickEdit(record)}
					/>
					<ActionButton
						action="delete"
						onClick={() => showDeleteConfirm(record.id, getFullName(record))}
					/>
				</Space>
			)
		}
	];

	return (
		<>
			<AddUser
				addUser={async (values: FormValues) => await addTeacher(values).unwrap()}
				isLoading={isAddLoading}
				addBtnText="Додати учителя"
				modalTitle="Новий учитель"
				successMessage="Нового учителя успішно додано"
				alternativeErrorMessage="Виникла помилка під час додавання нового учителя"
			/>
			<div className="table-responsive">
				<Table
					bordered
					loading={isFetching}
					pagination={{
						pageSize: limit,
						total: data ? data.total : 0,
						showSizeChanger: true,
						pageSizeOptions: [2, 5, 10, 20, 50, 100],
						responsive: true,
						showTotal: (total) => `Всього ${total} учителів`,
						onChange: (page, pageSize) => {
							setPage(page);
							setLimit(pageSize);
						}
					}}
					columns={columns}
					dataSource={!data ? []
						: data.data.map((teacher, index) => ({
							...teacher,
							key: teacher.id,
							number: limit * (page - 1) + index + 1
						}))
					}
				/>
			</div>
			<Modal
				title="Редагування даних учителя"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти зміни"
				cancelText="Скасувати"
				confirmLoading={isEditLoading}
				onOk={formEditTeacher.submit}
			>
				<UserForm
					form={formEditTeacher}
					onFinish={submitEditTeacher}
				/>
			</Modal>
		</>
	);
}
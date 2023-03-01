import React, { useState } from 'react';
import { Empty, Form, Modal, Skeleton, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';

import { ApiError } from '../../../api/config';
import { useDeleteMutation, useEditMutation, useGetEducationsQuery } from '../../../api/services/educationService';
import useModal from '../../../hooks/useModal';
import FailedRequest from '../../../components/FailedRequest';
import ActionButton from '../../../components/ActionButton';
import { ITeacher } from '../../../models/ITeacher';
import { IClass } from '../../../models/IClass';
import { ISubject } from '../../../models/ISubject';
import getFullName from '../../../utils/getFullName';
import confirmDelete from '../../../utils/confirmDelete';
import transactionWithNotification from '../../../utils/transactionWithNotification';
import AddEducation, { FormValues } from './AddEducation';
import EditEducationForm from './EditEducationForm';

interface DataType {
	id: string;
	number: number;
	teacher: Omit<ITeacher, 'educations'> | null;
	cls: Omit<IClass, 'educations'> | null;
	subject: Omit<ISubject, 'educations'> | null;
}

export default function EducationsPage() {
	document.title = 'Викладання предметів';
	
	const { data, isLoading, isFetching, error, refetch } = useGetEducationsQuery();

	const { isOpen, onOpen, onClose } = useModal();
	const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
	const [formEditEducation] = Form.useForm<FormValues>();
	const [editEducation, { isLoading: isEditLoading }] = useEditMutation();

	const [deleteEducation] = useDeleteMutation();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
	}

	if (isLoading) {
		return <Skeleton active />;
	}

	if (!data || data.length === 0) {
		return (
			<>
				<AddEducation />
				<Empty className="mt-4" description="Дані відсутні" />
			</>
		);
	}

	async function onDeleteEducation(id: string) {
		await transactionWithNotification(
			async () => {await deleteEducation({ id }).unwrap()},
			'Запис про викладання предмету успішно видалено',
			'Виникла помилка під час видалення запису про викладання предмету'
		);
	}

	function showDeleteConfirm(id: string) {
		confirmDelete(
			'Видалити запис про викладання предмету?',
			'Ви дійсно бажаєте видалити запис про викладання предмету?',
			() => onDeleteEducation(id)
		);
	}

	async function submitEditEducation(values: FormValues) {
		await transactionWithNotification(
			async () => {
				if (!selectedEditId) {
					throw new Error();
				}

				await editEducation({ ...values, id: selectedEditId }).unwrap();
				setSelectedEditId(null);
				onClose();
			},
			'Запис про викладання предмету успішно змінено',
			'Виникла помилка при зміні запису про викладання предмету'
		);
	}

	function onClickEdit(education: DataType) {
		formEditEducation.resetFields();
		formEditEducation.setFieldsValue({
			teacherId: education.teacher?.id,
			classId: education.cls?.id,
			subjectId: education.subject?.id
		});

		setSelectedEditId(education.id);
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
			title: 'Клас',
			dataIndex: 'cls',
			width: 100,
			className: 'text-center',
			render: (_, record) => record?.cls?.name
		},
		{
			title: 'Предмет',
			dataIndex: 'subject',
			render: (_, record) => record?.subject?.name
		},
		{
			title: 'Учитель',
			dataIndex: 'teacher',
			render: (_, record) => getFullName(record.teacher)
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
						onClick={() => showDeleteConfirm(record.id)}
					/>
				</Space>
			)
		}
	];

	return (
		<>
			<Title level={2} className="text-center">
				Викладання предметів ({data.length})
			</Title>
			<AddEducation />
			<Table
				className="mt-4"
				bordered
				pagination={false}
				loading={isFetching}
				columns={columns}
				dataSource={data.map((education, index) => ({
					...education,
					key: education.id,
					number: index + 1
				}))}
			/>
			<Modal
				title="Редагування запису про викладання предмету"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти зміни"
				cancelText="Скасувати"
				confirmLoading={isEditLoading}
				onOk={formEditEducation.submit}
			>
				<EditEducationForm
					form={formEditEducation}
					onFinish={submitEditEducation}
				/>
			</Modal>
		</>
	);
}
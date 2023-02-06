import React, { useState } from 'react';
import { Form, Modal, Table } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

import { ISubject } from '../../../../models/ISubject';
import { useDeleteMutation, useEditMutation } from '../../../../api/services/subjectService';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import { columns } from './columns';
import { FormValues } from '../SubjectForm';
import EditSubjectModal from '../EditSubjectModal';

const { confirm } = Modal;

interface Props {
	subjects: ISubject[];
}

export default function TableSubjects({ subjects }: Props) {
	const [visibleEditModal, setVisibleModal] = useState(false);
	const [selectedEditId, setSelectedEditId] = useState<string | null>(null);

	const [formEditSubject] = Form.useForm();
	const [editSubject, { isLoading }] = useEditMutation();

	const [deleteSubject] = useDeleteMutation();

	async function onEditSubject(values: FormValues) {
		await transactionWithNotification(
			async () => {
				if (!selectedEditId) {
					throw new Error();
				}

				await editSubject({ ...values, id: selectedEditId }).unwrap();
				setSelectedEditId(null);
				setVisibleModal(false);
			},
			'Назву предмета успішно змінено',
			'Виникла помилка при зміні назви предмета'
		);
	}

	async function onDeleteSubject(id: string, name: string) {
		await transactionWithNotification(
			async () => {await deleteSubject({ id }).unwrap()},
			`Предмет "${name}" успішно видалено`,
			`Виникла помилка під час видалення предмету "${name}"`
		);
	}

	function showDeleteConfirm(id: string, name: string) {
		confirm({
			type: 'warning',
			title: 'Видалити предмет?',
			icon: <WarningOutlined />,
			content: (
				<>
					<p>Ви дійсно бажаєте видалити предмет "{name}"?</p>
					<p className="text-muted">Дану дію скасувати неможливо.</p>
				</>
			),
			okText: 'Так, видалити',
			okType: 'danger',
			cancelText: 'Скасувати',
			onOk: () => onDeleteSubject(id, name)
		});
	}

	function onClickEdit(id: string, name: string) {
		formEditSubject.resetFields();
		formEditSubject.setFieldValue('name', name);
		setSelectedEditId(id);
		setVisibleModal(true);
	}

	return (
		<>
			<div className="table-responsive">
				<Table
					bordered
					pagination={false}
					columns={columns}
					dataSource={subjects.map((subject, index) => ({
						...subject,
						key: subject.id,
						number: index + 1,
						onClickEdit: () => onClickEdit(subject.id, subject.name),
						onClickDelete: () => showDeleteConfirm(subject.id, subject.name)
					}))}
				/>
			</div>
			<EditSubjectModal
				isOpen={visibleEditModal}
				onClose={() => setVisibleModal(false)}
				isLoading={isLoading}
				formEditSubject={formEditSubject}
				onFinishEditSubject={onEditSubject}
			/>
		</>
	);
}
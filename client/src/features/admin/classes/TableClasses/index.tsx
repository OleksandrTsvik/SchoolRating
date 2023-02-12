import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Form, Modal, Space, Table } from 'antd';

import { IClass } from '../../../../models/IClass';
import useModal from '../../../../hooks/useModal';
import { useDeleteMutation, useEditMutation } from '../../../../api/services/classService';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import confirmDelete from '../../../../utils/confirmDelete';
import ActionButton from '../../../../components/ActionButton';
import ClassForm, { FormValues } from '../ClassForm';

export interface DataType {
	id: string;
	number: number;
	name: string;
}

interface Props {
	classes: IClass[];
}

export default function TableClasses({ classes }: Props) {
	const { isOpen, onOpen, onClose } = useModal();
	const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
	const [formEditClass] = Form.useForm<FormValues>();
	const [editClass, { isLoading }] = useEditMutation();

	const [deleteClass] = useDeleteMutation();

	async function onEditClass(values: FormValues) {
		await transactionWithNotification(
			async () => {
				if (!selectedEditId) {
					throw new Error();
				}

				await editClass({ ...values, id: selectedEditId }).unwrap();
				setSelectedEditId(null);
				onClose();
			},
			'Назву класу успішно змінено',
			'Виникла помилка при зміні назви класу'
		);
	}

	async function onDeleteClass(id: string, name: string) {
		await transactionWithNotification(
			async () => {await deleteClass({ id }).unwrap()},
			`Клас "${name}" успішно видалено`,
			`Виникла помилка під час видалення класу "${name}"`
		);
	}

	function showDeleteConfirm({ id, name }: DataType) {
		confirmDelete(
			'Видалити клас?',
			`Ви дійсно бажаєте видалити клас "${name}"?`,
			() => onDeleteClass(id, name)
		);
	}

	function onClickEdit({ id, name }: DataType) {
		formEditClass.resetFields();
		formEditClass.setFieldValue('name', name);
		setSelectedEditId(id);
		onOpen();
	}

	const columns: ColumnsType<DataType> = [
		{ title: '#', dataIndex: 'number', width: 20, className: 'text-center' },
		{ title: 'Name', dataIndex: 'name' },
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
						onClick={() => showDeleteConfirm(record)}
					/>
				</Space>
			)
		}
	];

	return (
		<>
			<div className="table-responsive">
				<Table
					bordered
					pagination={false}
					columns={columns}
					dataSource={classes.map((cls, index) => ({
						...cls,
						key: cls.id,
						number: index + 1
					}))}
				/>
			</div>
			<Modal
				title="Редагування назви класу"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти зміни"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={formEditClass.submit}
			>
				<ClassForm
					form={formEditClass}
					onFinish={onEditClass}
				/>
			</Modal>
		</>
	);
}
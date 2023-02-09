import React, { useRef, useState } from 'react';
import { Button, Form, Input, InputRef, Modal, Space } from 'antd';
import Moment from 'moment';
import Table, { ColumnsType, ColumnType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import FailedRequest from '../FailedRequest';
import { ApiError } from '../../../../api/config';
import { useDeleteMutation, useEditMutation, useGetStudentsQuery } from '../../../../api/services/adminStudentService';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import getFullName from '../../../../utils/getFullName';
import confirmDelete from '../../../../utils/confirmDelete';
import useModal from '../../../../hooks/useModal';
import UserForm, { FormValues } from '../../../../components/UserForm';
import ActionButton from '../../../../components/ActionButton';
import { IStudent } from '../../../../models/IStudent';
import AddStudent from './AddStudent';

interface DataType {
	id: string;
	number: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
}

type DataIndex = keyof DataType;

export default function Students() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [filters, setFilters] = useState({
		firstName: null,
		lastName: null,
		patronymic: null,
		email: null
	});
	const filterInput = useRef<InputRef>(null);
	const { data, isFetching, error, refetch } = useGetStudentsQuery({ page, limit, ...filters });

	const { isOpen, onOpen, onClose } = useModal();
	const [formEditStudent] = Form.useForm<FormValues>();
	const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
	const [editStudent, { isLoading: isEditLoading }] = useEditMutation();

	const [deleteStudent] = useDeleteMutation();

	if (error) {
		return <FailedRequest loading={isFetching} error={error as ApiError} refetch={refetch} />;
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

	async function submitEditStudent(values: FormValues) {
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

	function updateFilter(key: string, value: string | null) {
		setFilters(state => ({
			...state,
			[key]: value
		}));
	}

	function onFilter(
		selectedKeys: React.Key[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex,
		closeDropdown: boolean = true
	) {
		confirm({ closeDropdown }); // close filter block
		updateFilter(dataIndex, selectedKeys[0] as string);
	}

	function resetFilter(
		dataIndex: DataIndex,
		confirm: (param?: FilterConfirmProps) => void,
		clearFilters: () => void
	) {
		clearFilters();
		confirm();
		updateFilter(dataIndex, null);
	}

	function getColumnSearchProps(dataIndex: DataIndex, placeholder: string = dataIndex): ColumnType<DataType> {
		return {
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
				<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
					<Input
						ref={filterInput}
						placeholder={placeholder}
						value={selectedKeys[0]}
						onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
						onPressEnter={() => onFilter(selectedKeys, confirm, dataIndex)}
						style={{ marginBottom: 8, display: 'block' }}
					/>
					<Space>
						<Button
							type="primary"
							onClick={() => onFilter(selectedKeys, confirm, dataIndex)}
							icon={<SearchOutlined />}
							size="small"
							style={{ width: 90 }}
						>
							Пошук
						</Button>
						<Button
							onClick={() => clearFilters && resetFilter(dataIndex, confirm, clearFilters)}
							size="small"
							style={{ width: 90 }}
						>
							Скинути
						</Button>
						<Button
							type="link"
							size="small"
							onClick={() => onFilter(selectedKeys, confirm, dataIndex, false)}
						>
							Застосувати
						</Button>
						<Button type="link" size="small" onClick={close}>Закрити</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered: boolean) => (
				<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
			),
			onFilterDropdownOpenChange: (visible) => {
				if (visible) {
					setTimeout(() => filterInput.current?.select(), 100);
				}
			},
			render: (text) => {
				if (filters.hasOwnProperty(dataIndex) && filters[dataIndex as keyof typeof filters]) {
					let searchWord: any = filters[dataIndex as keyof typeof filters];
					searchWord = searchWord ? [searchWord] : [];

					return (
						<Highlighter
							highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
							searchWords={searchWord}
							autoEscape
							textToHighlight={text || ''}
						/>
					);
				}

				return text;
			}
		};
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
			<AddStudent />
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
						showTotal: (total) => `Всього ${total} учнів`,
						onChange: (page, pageSize) => {
							setPage(page);
							setLimit(pageSize);
						}
					}}
					columns={columns}
					dataSource={data && data.data.map((student, index) => ({
						...student,
						key: student.id,
						number: limit * (page - 1) + index + 1
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
					onFinish={submitEditStudent}
				/>
			</Modal>
		</>
	);
}
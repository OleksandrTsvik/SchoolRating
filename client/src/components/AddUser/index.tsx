import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import useModal from '../../hooks/useModal';
import UserForm, { FormValues } from '../UserForm';
import transactionWithNotification from '../../utils/transactionWithNotification';

interface Props {
	addUser: (values: FormValues) => Promise<void>;
	isLoading: boolean;
	addBtnText: string;
	modalTitle: string;
	successMessage: string;
	alternativeErrorMessage: string;
}

export default function AddUser(
	{
		addUser,
		isLoading,
		addBtnText,
		modalTitle,
		successMessage,
		alternativeErrorMessage
	}: Props
) {
	const { isOpen, onOpen, onClose } = useModal();
	const [formAddUser] = Form.useForm<FormValues>();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await addUser(values);
				closeModal();
			},
			successMessage,
			alternativeErrorMessage
		);
	}

	function closeModal() {
		onClose();
		formAddUser.resetFields();
	}

	return (
		<>
			<div className="text-end mb-3">
				<Button
					size="large"
					icon={<PlusOutlined />}
					onClick={onOpen}
				>
					{addBtnText}
				</Button>
			</div>
			<Modal
				title={modalTitle}
				open={isOpen}
				onCancel={closeModal}
				okText="Додати"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={formAddUser.submit}
			>
				<UserForm
					form={formAddUser}
					onFinish={onFinish}
					isPasswordRequired={true}
				/>
			</Modal>
		</>
	);
}
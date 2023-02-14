import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useRegisterMutation } from '../../../../../api/services/adminService';
import useModal from '../../../../../hooks/useModal';
import transactionWithNotification from '../../../../../utils/transactionWithNotification';
import AddAdminForm, { FormValues } from './AddAdminForm';

export default function AddAdmin() {
	const { isOpen, onOpen, onClose } = useModal();
	const [formAddAdmin] = Form.useForm<FormValues>();
	const [registerAdmin, { isLoading }] = useRegisterMutation();

	async function onFinishAddAdmin(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await registerAdmin(values).unwrap();
				closeModal();
			},
			'Нового адміністратора успішно додано',
			'Виникла помилка при додаванні нового адміністратора'
		);
	}

	function closeModal() {
		onClose();
		formAddAdmin.resetFields();
	}

	return (
		<>
			<div className="text-end mb-3">
				<Button
					size="large"
					icon={<PlusOutlined />}
					onClick={onOpen}
				>
					Додати адміна
				</Button>
			</div>
			<Modal
				title="Новий адміністратор"
				open={isOpen}
				onCancel={closeModal}
				okText="Додати"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={formAddAdmin.submit}
			>
				<AddAdminForm
					form={formAddAdmin}
					onFinish={onFinishAddAdmin}
				/>
			</Modal>
		</>
	);
}
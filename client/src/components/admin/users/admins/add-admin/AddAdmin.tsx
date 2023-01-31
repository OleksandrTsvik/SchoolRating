import { Button, Form, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import useModal from '../../../../../hooks/useModal';
import { useRegisterMutation } from '../../../../../api/services/adminService';
import AddAdminForm, { FormValues } from './AddAdminForm';
import transactionWithNotification from '../../../../../utils/transactionWithNotification';

export default function AddAdmin() {
	const { isOpen, onOpen, onClose } = useModal();
	const [formAddAdmin] = Form.useForm();
	const [registerAdmin, { isLoading }] = useRegisterMutation();

	async function onFinishAddAdmin(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await registerAdmin(values).unwrap();
				onClose();
				formAddAdmin.resetFields();
			},
			'Нового адміністратора успішно додано',
			'Виникла помилка при додаванні нового адміністратора'
		);
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
				onCancel={onClose}
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
import { Button, Form, Modal, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import useModal from '../../../../hooks/useModal';
import { useRegisterMutation } from '../../../../api/services/adminService';
import RenderError from '../../../../utils/RenderError';
import { ApiError } from '../../../../api/config';
import AddAdminForm, { FormValues } from './AddAdminForm';

export default function AddAdmin() {
	const { isOpen, onOpen, onClose } = useModal();
	const [formAddAdmin] = Form.useForm();
	const [registerAdmin, { isLoading }] = useRegisterMutation();

	async function onFinishAddAdmin(values: FormValues) {
		try {
			await registerAdmin(values).unwrap();

			notification.open({
				type: 'success',
				message: 'Нового адміністратора успішно додано'
			});

			onClose();
			formAddAdmin.resetFields();
		} catch (error) {
			notification.open({
				type: 'error',
				message: 'Виникла помилка',
				description: <RenderError
					error={error as ApiError}
					message="Виникла помилка при додаванні нового адміністратора"
				/>
			});
		}
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
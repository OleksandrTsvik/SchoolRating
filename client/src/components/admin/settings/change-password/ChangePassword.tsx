import { Button, Form, Modal, notification } from 'antd';

import useModal from '../../../../hooks/useModal';
import ChangePasswordForm, { FormValues } from '../change-password-form/ChangePasswordForm';
import { ApiError } from '../../../../api/config';
import { useChangePasswordMutation } from '../../../../api/services/adminService';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import { useAppSelector } from '../../../../store';
import RenderError from '../../../../utils/RenderError';

export default function ChangePassword() {
	const { id } = useAppSelector(selectCurrentAdmin);

	const { isOpen, onOpen, onClose } = useModal();
	const [formChangePassword] = Form.useForm();
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	async function onFinishChangePassword(values: FormValues) {
		try {
			await changePassword({ ...values, id }).unwrap();

			notification.open({
				type: 'success',
				message: 'Пароль успішно змінено'
			});

			onClose();
			formChangePassword.resetFields();
		} catch (error) {
			notification.open({
				type: 'error',
				message: 'Виникла помилка під час зміни пароля',
				description: <RenderError error={error as ApiError} message="На сервері виникла помилка" />
			});
		}
	}

	return (
		<>
			<div className="text-end mt-3">
				<Button
					type="default"
					danger
					onClick={onOpen}
				>
					Змінити пароль
				</Button>
			</div>
			<Modal
				title="Зміна пароля"
				open={isOpen}
				onCancel={onClose}
				okText="Зберегти"
				cancelText="Скасувати"
				confirmLoading={isLoading}
				onOk={formChangePassword.submit}
			>
				<ChangePasswordForm
					form={formChangePassword}
					onFinish={onFinishChangePassword}
				/>
			</Modal>
		</>
	);
}
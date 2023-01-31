import { Button, Form, Modal } from 'antd';

import useModal from '../../../../hooks/useModal';
import ChangePasswordForm, { FormValues } from '../change-password-form/ChangePasswordForm';
import { useChangePasswordMutation } from '../../../../api/services/adminService';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import { useAppSelector } from '../../../../store';
import transactionWithNotification from '../../../../utils/transactionWithNotification';

export default function ChangePassword() {
	const { id } = useAppSelector(selectCurrentAdmin);

	const { isOpen, onOpen, onClose } = useModal();
	const [formChangePassword] = Form.useForm();
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	async function onFinishChangePassword(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await changePassword({ ...values, id }).unwrap();
				onClose();
				formChangePassword.resetFields();
			},
			'Пароль успішно змінено',
			'Виникла помилка під час зміни пароля'
		);
	}

	return (
		<>
			<Button
				type="default"
				onClick={onOpen}
			>
				Змінити пароль
			</Button>
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
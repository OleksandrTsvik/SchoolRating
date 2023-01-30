import { Button, Modal, notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

import RenderError from '../../../../utils/RenderError';
import { ApiError } from '../../../../api/config';
import { useDeleteMutation } from '../../../../api/services/adminService';
import { useAppSelector } from '../../../../store';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';

const { confirm } = Modal;

export default function DeleteAccount() {
	const { id } = useAppSelector(selectCurrentAdmin);

	const [deleteAccount] = useDeleteMutation();

	async function onDeleteAccount() {
		try {
			await deleteAccount({ id }).unwrap();

			notification.open({
				type: 'success',
				message: 'Акаунт успішно видалено'
			});
		} catch (error) {
			notification.open({
				type: 'error',
				message: 'Виникла помилка під час видалення акаунта',
				description: <RenderError error={error as ApiError} />
			});
		}
	}

	function showDeleteConfirm() {
		confirm({
			type: 'warning',
			title: 'Видалити акаунт?',
			icon: <WarningOutlined />,
			content: <>
				<p>Ви дійсно бажаєте видалити свій акаунт?</p>
				<p className="text-muted">Дану дію скасувати неможливо.</p>
			</>,
			okText: 'Так, видалити',
			okType: 'danger',
			cancelText: 'Скасувати',
			onOk: onDeleteAccount
		});
	}

	return (
		<>
			<Button type="primary" danger onClick={showDeleteConfirm}>
				Видалити акаунт
			</Button>
		</>
	);
}
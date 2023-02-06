import { Button, Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

import { useDeleteMutation } from '../../../../api/services/adminService';
import { useAppSelector } from '../../../../store';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import transactionWithNotification from '../../../../utils/transactionWithNotification';

const { confirm } = Modal;

export default function DeleteAccount() {
	const { id } = useAppSelector(selectCurrentAdmin);
	const [deleteAccount] = useDeleteMutation();

	async function onDeleteAccount() {
		await transactionWithNotification(
			async () => {await deleteAccount({ id }).unwrap()},
			'Акаунт успішно видалено',
			'Виникла помилка під час видалення акаунта'
		);
	}

	function showDeleteConfirm() {
		confirm({
			type: 'warning',
			title: 'Видалити акаунт?',
			icon: <WarningOutlined />,
			content: (
				<>
					<p>Ви дійсно бажаєте видалити свій акаунт?</p>
					<p className="text-muted">Дану дію скасувати неможливо.</p>
				</>
			),
			okText: 'Так, видалити',
			okType: 'danger',
			cancelText: 'Скасувати',
			onOk: onDeleteAccount
		});
	}

	return (
		<Button type="primary" danger onClick={showDeleteConfirm}>
			Видалити акаунт
		</Button>
	);
}
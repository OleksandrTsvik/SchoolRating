import { Button } from 'antd';

import { useAppSelector } from '../../../../store';
import { useDeleteMutation } from '../../../../api/services/adminService';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import confirmDelete from '../../../../utils/confirmDelete';

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
		confirmDelete(
			'Видалити акаунт?',
			'Ви дійсно бажаєте видалити свій акаунт?',
			onDeleteAccount
		);
	}

	return (
		<Button type="primary" danger onClick={showDeleteConfirm}>
			Видалити акаунт
		</Button>
	);
}
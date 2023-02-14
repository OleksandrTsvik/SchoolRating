import { Empty } from 'antd';

import { useAppSelector } from '../../../store';
import { selectCurrentAdmin } from '../../../api/auth/admin/authAdminSlice';
import Info from './Info';
import DeleteAccount from './DeleteAccount';

export default function SettingsPage() {
	const admin = useAppSelector(selectCurrentAdmin);

	if (!admin) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			<Info admin={admin} />
			<div className="text-end mt-3">
				<DeleteAccount />
			</div>
		</>
	);
}
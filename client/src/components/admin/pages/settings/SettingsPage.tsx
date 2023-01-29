import { Empty } from 'antd';

import { useAppSelector } from '../../../../store';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import Info from '../../settings/info/Info';
import ChangePassword from '../../settings/change-password/ChangePassword';

export default function SettingsPage() {
	const admin = useAppSelector(selectCurrentAdmin);

	if (!admin) {
		return <Empty description="Дані відсутні" />;
	}

	return (
		<>
			<Info admin={admin} />
			<ChangePassword />
		</>
	);
}
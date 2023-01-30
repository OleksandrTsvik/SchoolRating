import { Empty } from 'antd';

import { useAppSelector } from '../../../../store';
import { selectCurrentAdmin } from '../../../../api/auth/admin/authAdminSlice';
import Info from '../../settings/info/Info';
import DeleteAccount from '../../settings/delete-account/DeleteAccount';

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
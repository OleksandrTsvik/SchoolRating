import { Descriptions } from 'antd';

import { Admin } from '../../../../api/auth/admin/authAdminApi';
import ChangePassword from '../ChangePassword';

interface Props {
	admin: Admin;
}

export default function Info({ admin }: Props) {
	return (
		<Descriptions title="Профіль" bordered column={24}>
			<Descriptions.Item span={24} label="Email">{admin.email}</Descriptions.Item>
			<Descriptions.Item span={24} label="Змінити пароль">
				<ChangePassword />
			</Descriptions.Item>
		</Descriptions>
	);
}
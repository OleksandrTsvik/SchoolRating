import { Descriptions } from 'antd';

import { Admin } from '../../../../api/auth/admin/authAdminApi';

interface Props {
	admin: Admin;
}

export default function Info({ admin }: Props) {
	return (
		<Descriptions title="Профіль" bordered>
			<Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
		</Descriptions>
	);
}
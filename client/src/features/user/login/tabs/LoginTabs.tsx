import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';

import StudentLogin from '../student/StudentLogin';

export default function LoginTabs() {
	const navigate = useNavigate();
	const location = useLocation();

	function onChange(activeKey: string) {
		navigate(activeKey);
	}

	return (
		<Tabs
			defaultActiveKey={location.pathname}
			centered
			onChange={onChange}
			items={[
				{ key: '/login/student', label: 'Для учнів', children: <StudentLogin /> },
				{ key: '/login/teacher', label: 'Для учителів', children: 'Teacher' }
			]}
		/>
	);
}
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';

import StudentRegister from '../StudentRegister';
import TeacherRegister from '../TeacherRegister';

export default function RegisterTabs() {
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
				{ key: '/register/student', label: 'Для учнів', children: <StudentRegister /> },
				{ key: '/register/teacher', label: 'Для учителів', children: <TeacherRegister /> }
			]}
		/>
	);
}
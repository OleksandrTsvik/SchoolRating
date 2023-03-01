import { Content } from 'antd/es/layout/layout';
import { Navigate } from 'react-router-dom';

import useAdminAuth from '../../../hooks/useAdminAuth';
import LoginForm from './LoginForm';

import styles from './LoginPage.module.scss';

export default function LoginPage() {
	document.title = 'Вхід в адмін-панель';

	const { isAuth } = useAdminAuth();

	return (
		isAuth
			? <Navigate to="/admin" />
			: <Content className={styles.container}>
				<LoginForm />
			</Content>
	);
}
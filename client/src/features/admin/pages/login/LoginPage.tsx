import { Content } from 'antd/es/layout/layout';
import LoginForm from '../../login/login-form/LoginForm';
import { Navigate } from 'react-router-dom';

import styles from './LoginPage.module.scss';
import useAdminAuth from '../../../../hooks/useAdminAuth';

export default function LoginPage() {
	const { isAuth } = useAdminAuth();

	return (
		isAuth
			? <Navigate to="/admin" />
			: <Content className={styles.container}>
				<LoginForm />
			</Content>
	);
}
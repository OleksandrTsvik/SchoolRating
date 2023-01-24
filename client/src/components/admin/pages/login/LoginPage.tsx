import { Content } from 'antd/es/layout/layout';
import LoginForm from '../../login/login-form/LoginForm';

import styles from './LoginPage.module.scss';

export default function LoginPage() {
	return (
		<Content className={styles.container}>
			<LoginForm />
		</Content>
	);
}
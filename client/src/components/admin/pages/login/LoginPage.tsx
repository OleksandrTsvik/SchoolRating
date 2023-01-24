import { Content } from 'antd/es/layout/layout';
import LoginForm from '../../login/login-form/login-form';

import styles from './login-page.module.scss';

export default function LoginPage() {
	return (
		<Content className={styles.container}>
			<LoginForm />
		</Content>
	);
}
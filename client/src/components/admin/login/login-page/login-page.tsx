import { Content } from 'antd/es/layout/layout';
import LoginForm from '../login-form/login-form';

import './login-page.css';

export default function LoginPage() {
	return (
		<Content className="container">
			<LoginForm />
		</Content>
	);
}
import { Alert, Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import RenderError from '../../../../utils/RenderError';
import { ApiError } from '../../../../api/config';
import { rules } from './rules';

import styles from './LoginForm.module.scss';

export interface FormValues {
	email: string;
	password: string;
}

interface Props {
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	onFinish: (values: FormValues) => void;
	btnTextLogin: string;
	linkToRegister: string;
}

export default function LoginForm(
	{
		isLoading,
		isError,
		error,
		onFinish,
		btnTextLogin,
		linkToRegister
	}: Props
) {
	const [form] = Form.useForm<FormValues>();

	return (
		<>
			<Form
				className={styles.loginForm}
				form={form}
				onFinish={onFinish}
			>
				{isError &&
					<Alert
						className="mb-3"
						message={<RenderError error={error as ApiError} message="Виникла помилка під час входу" />}
						type="error"
						showIcon
					/>
				}

				<Form.Item
					hasFeedback
					name="email"
					rules={rules.email}
				>
					<Input
						prefix={<MailOutlined />}
						placeholder="Email"
					/>
				</Form.Item>

				<Form.Item
					hasFeedback
					name="password"
					rules={rules.password}
				>
					<Input.Password
						prefix={<LockOutlined />}
						placeholder="Пароль"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						className={styles.loginFormButton}
						type="primary"
						htmlType="submit"
						loading={isLoading}
					>
						{btnTextLogin}
					</Button>
				</Form.Item>
			</Form>
			<div className={styles.registerLink}>
				<div>Немає облікового запису?</div>
				<Link to={linkToRegister}>Перейти до реєстрації</Link>
			</div>
		</>
	);
}
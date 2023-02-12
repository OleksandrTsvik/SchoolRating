import { Alert, Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import ShowError from '../ShowError';
import { ApiError } from '../../api/config';
import { rules } from './rules';

import styles from './RegisterForm.module.scss';

export interface FormValues {
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface Props {
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	onFinish: (values: FormValues) => void;
	btnTextRegister: string;
	linkToLogin: string;
}

export default function RegisterForm(
	{
		isLoading,
		isError,
		error,
		onFinish,
		btnTextRegister,
		linkToLogin
	}: Props
) {
	const [form] = Form.useForm<FormValues>();

	return (
		<>
			<Form
				className={styles.loginForm}
				layout="vertical"
				form={form}
				onFinish={onFinish}
			>
				{isError &&
					<Alert
						className="mb-3"
						message={<ShowError error={error as ApiError} message="Виникла помилка під час реєстрації" />}
						type="error"
						showIcon
					/>
				}

				<Row gutter={16}>
					<Col xs={24} sm={8}>
						<Form.Item
							hasFeedback
							label="Ім'я"
							name="firstName"
							rules={rules.firstName}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={8}>
						<Form.Item
							hasFeedback
							label="Прізвище"
							name="lastName"
							rules={rules.lastName}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={8}>
						<Form.Item
							hasFeedback
							label="По батькові"
							name="patronymic"
							rules={rules.patronymic}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item
					hasFeedback
					label="Email"
					name="email"
					rules={rules.email}
				>
					<Input prefix={<MailOutlined />} />
				</Form.Item>

				<Form.Item
					hasFeedback
					label="Пароль"
					name="password"
					rules={rules.password}
				>
					<Input.Password prefix={<LockOutlined />} />
				</Form.Item>

				<Form.Item
					hasFeedback
					label="Повторіть пароль"
					name="confirmPassword"
					rules={rules.confirmPassword}
				>
					<Input.Password prefix={<LockOutlined />} />
				</Form.Item>

				<Form.Item>
					<Button
						className={styles.loginFormButton}
						type="primary"
						htmlType="submit"
						loading={isLoading}
					>
						{btnTextRegister}
					</Button>
				</Form.Item>
			</Form>
			<div className={styles.registerLink}>
				<div>Вже є акаунт?</div>
				<Link to={linkToLogin}>Увійти</Link>
			</div>
		</>
	);
}
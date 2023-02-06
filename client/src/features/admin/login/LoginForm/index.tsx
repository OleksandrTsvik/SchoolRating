import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

import { rules } from './rules';
import { useLoginMutation } from '../../../../api/auth/admin/authAdminApi';
import { ApiError } from '../../../../api/config';
import RenderError from '../../../../utils/RenderError';

import styles from './LoginForm.module.scss';

export default function LoginForm() {
	const navigate = useNavigate();

	const [login, { isLoading, isError, error }] = useLoginMutation();

	async function onFinish(values: any) {
		try {
			await login(values).unwrap();
			navigate('/admin');
		} catch (error) {
			// console.log(error);
		}
	}

	return (
		<Form
			className={styles.loginForm}
			onFinish={onFinish}
		>
			<Title
				level={2}
				className="text-center"
			>
				Адмін-панель
			</Title>

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
					Увійти
				</Button>
			</Form.Item>
		</Form>
	);
}
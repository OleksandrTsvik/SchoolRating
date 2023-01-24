import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { rules } from './rules';
import { CustomError, useLoginMutation } from '../../../../api/auth/authAdminApi';
import { logIn } from '../../../../api/auth/authAdminSlice';

import styles from './LoginForm.module.scss';

export default function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading, isError, error }] = useLoginMutation();

	async function onFinish(values: any) {
		try {
			const payload = await login(values).unwrap();
			dispatch(logIn(payload));
			navigate('/admin');
		} catch (e) {
			console.log(e);
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
					message={(error as CustomError).data.message}
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
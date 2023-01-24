import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import styles from './login-form.module.scss';
import Title from 'antd/es/typography/Title';

export default function LoginForm() {
	function onFinish(values: any) {
		console.log('Received values of form: ', values);
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

			<Form.Item
				name="email"
				rules={[{ required: true, message: 'Please input your Email!' }]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Email"
				/>
			</Form.Item>

			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input your Password!' }]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className={styles.loginFormButton}
				>
					Увійти
				</Button>
			</Form.Item>
		</Form>
	);
}
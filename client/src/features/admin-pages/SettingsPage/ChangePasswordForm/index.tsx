import { Form, Input } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form/hooks/useForm';

import { rules } from './rules';

export interface FormValues {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface Props {
	form: FormInstance<FormValues>;
	onFinish: (values: FormValues) => void;
}

export default function ChangePasswordForm({ form, onFinish }: Props) {
	return (
		<Form
			layout="vertical"
			form={form}
			onFinish={onFinish}
		>
			<Form.Item
				hasFeedback
				label="Поточний пароль"
				name="currentPassword"
				rules={rules.currentPassword}
			>
				<Input.Password prefix={<UnlockOutlined />} />
			</Form.Item>

			<Form.Item
				hasFeedback
				label="Новий пароль"
				name="newPassword"
				rules={rules.newPassword}
			>
				<Input.Password prefix={<LockOutlined />} />
			</Form.Item>

			<Form.Item
				hasFeedback
				label="Новий пароль ще раз"
				name="confirmPassword"
				rules={rules.confirmPassword}
			>
				<Input.Password prefix={<LockOutlined />} />
			</Form.Item>
		</Form>
	);
}
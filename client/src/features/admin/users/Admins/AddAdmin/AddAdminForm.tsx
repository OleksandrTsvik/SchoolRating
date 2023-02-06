import { Form, FormInstance, Input } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import { rules } from './rules';

export interface FormValues {
	password: string;
	email: string;
}

interface Props {
	form: FormInstance<FormValues>;
	onFinish: (values: FormValues) => void;
}

export default function AddAdminForm({ form, onFinish }: Props) {
	return (
		<Form
			layout="vertical"
			form={form}
			onFinish={onFinish}
		>
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
				label="Email"
				name="email"
				rules={rules.email}
			>
				<Input prefix={<MailOutlined />} />
			</Form.Item>
		</Form>
	);
}
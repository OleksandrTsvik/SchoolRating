import { Form, FormInstance, Input } from 'antd';
import { BookOutlined } from '@ant-design/icons';

import { rules } from './rules';

export interface FormValues {
	name: string;
}

interface Props {
	form: FormInstance<FormValues>;
	onFinish: (values: FormValues) => void;
}

export default function ClassForm({ form, onFinish }: Props) {
	return (
		<Form
			layout="vertical"
			form={form}
			onFinish={onFinish}
		>
			<Form.Item
				hasFeedback
				label="Назва класу"
				name="name"
				rules={rules.name}
			>
				<Input prefix={<BookOutlined />} />
			</Form.Item>
		</Form>
	);
}
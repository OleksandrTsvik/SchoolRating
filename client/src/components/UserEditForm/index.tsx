import { Form, FormInstance, Input } from 'antd';

import { inputs } from './inputs';

export interface FormValues {
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
}

interface Props {
	form: FormInstance<FormValues>;
	onFinish: (values: FormValues) => void;
}

export default function UserEditForm({ form, onFinish }: Props) {
	return (
		<Form
			layout="vertical"
			form={form}
			onFinish={onFinish}
		>
			{inputs.map((input, index) => (
				<Form.Item
					key={index}
					hasFeedback
					label={input.label}
					name={input.name}
					rules={input.rules}
				>
					<Input prefix={input.prefix} />
				</Form.Item>
			))}
		</Form>
	);
}
import { Form, FormInstance, Input } from 'antd';

import { inputs } from './inputs';
import { passwordRequired } from './rules';

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
	isPasswordRequired?: boolean;
}

export default function UserForm({ form, onFinish, isPasswordRequired = false }: Props) {
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
					rules={isPasswordRequired && input.name === 'password'
						? [...input.rules, passwordRequired]
						: input.rules
					}
				>
					<Input prefix={input.prefix} />
				</Form.Item>
			))}
		</Form>
	);
}
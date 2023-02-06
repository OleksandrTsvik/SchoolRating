import { ReactNode } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { NamePath } from 'rc-field-form/lib/interface';
import { Rule } from 'antd/es/form';
import { rules } from './rules';

interface Input {
	label: ReactNode;
	name: NamePath;
	rules: Rule[];
	prefix?: ReactNode;
}

export const inputs: Input[] = [
	{ label: 'Ім\'я', name: 'firstName', rules: rules.firstName },
	{ label: 'Прізвище', name: 'lastName', rules: rules.lastName },
	{ label: 'По батькові', name: 'patronymic', rules: rules.patronymic },
	{ label: 'Email', name: 'email', rules: rules.email, prefix: <MailOutlined /> },
	{ label: 'Пароль', name: 'password', rules: rules.password, prefix: <LockOutlined /> }
];
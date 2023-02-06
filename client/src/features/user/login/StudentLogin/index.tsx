import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'antd';

import { useLoginMutation } from '../../../../api/auth/user/authStudentApi';
import LoginForm, { FormValues } from '../LoginForm';

import styles from './StudentLogin.module.scss';

export default function StudentLogin() {
	const navigate = useNavigate();

	const [form] = Form.useForm();
	const [login, { isLoading, isError, error }] = useLoginMutation();

	async function onFinish(values: FormValues) {
		try {
			await login(values).unwrap();
			navigate('/cabinet');
		} catch (error) {
			// console.log(error);
		}
	}

	return (
		<>
			<LoginForm
				isLoading={isLoading}
				isError={isError}
				error={error}
				form={form}
				onFinish={onFinish}
			/>
			<div className={styles.registerLink}>
				<div>Немає облікового запису?</div>
				<Link to="/register/student">Перейти до реєстрації</Link>
			</div>
		</>
	);
}
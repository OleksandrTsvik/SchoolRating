import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'antd';

import RegisterForm, { FormValues } from '../RegisterForm';
import { useRegisterMutation } from '../../../../api/services/adminStudentService';

import styles from './StudentRegister.module.scss';
import transactionWithNotification from '../../../../utils/transactionWithNotification';

export default function StudentRegister() {
	const navigate = useNavigate();

	const [form] = Form.useForm();
	const [register, { isLoading, isError, error }] = useRegisterMutation();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await register(values).unwrap();
				navigate('/login');
			},
			'Ви успішно зареєструвалися як учень, тепер можете увійти в свій акаунт',
			'Виникла помилка при реєстрації як учень'
		);
	}

	return (
		<>
			<RegisterForm
				isLoading={isLoading}
				isError={isError}
				error={error}
				form={form}
				onFinish={onFinish}
			/>
			<div className={styles.registerLink}>
				<div>Вже є акаунт?</div>
				<Link to="/login/student">Увійти</Link>
			</div>
		</>
	);
}
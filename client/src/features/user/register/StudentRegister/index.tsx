import { useNavigate } from 'react-router-dom';

import RegisterForm, { FormValues } from '../RegisterForm';
import { useRegisterMutation } from '../../../../api/auth/user/authStudentApi';
import transactionWithNotification from '../../../../utils/transactionWithNotification';

export default function StudentRegister() {
	const navigate = useNavigate();
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
		<RegisterForm
			isLoading={isLoading}
			isError={isError}
			error={error}
			onFinish={onFinish}
			btnTextRegister="Зареєструватися як учень"
			linkToLogin="/login/student"
		/>
	);
}
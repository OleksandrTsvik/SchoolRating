import { useNavigate } from 'react-router-dom';

import RegisterForm, { FormValues } from '../../../../components/RegisterForm';
import { useRegisterMutation } from '../../../../api/auth/user/authTeacherApi';
import transactionWithNotification from '../../../../utils/transactionWithNotification';

export default function TeacherRegister() {
	const navigate = useNavigate();
	const [register, { isLoading, isError, error }] = useRegisterMutation();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await register(values).unwrap();
				navigate('/login/teacher');
			},
			'Ви успішно зареєструвалися як учитель, тепер можете увійти в свій акаунт',
			'Виникла помилка при реєстрації як учитель'
		);
	}

	return (
		<RegisterForm
			isLoading={isLoading}
			isError={isError}
			error={error}
			onFinish={onFinish}
			btnTextRegister="Зареєструватися як учитель"
			linkToLogin="/login/teacher"
		/>
	);
}
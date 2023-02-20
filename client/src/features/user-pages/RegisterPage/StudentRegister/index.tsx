import { useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '../../../../api/auth/student/authStudentApi';
import transactionWithNotification from '../../../../utils/transactionWithNotification';
import RegisterForm, { FormValues } from '../../../../components/RegisterForm';

export default function StudentRegister() {
	const navigate = useNavigate();
	const [register, { isLoading, isError, error }] = useRegisterMutation();

	async function onFinish(values: FormValues) {
		await transactionWithNotification(
			async () => {
				await register(values).unwrap();
				navigate('/login/student');
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
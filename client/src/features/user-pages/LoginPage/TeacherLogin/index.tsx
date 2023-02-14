import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../../../../api/auth/user/authTeacherApi';
import LoginForm, { FormValues } from '../../../../components/LoginForm';

export default function TeacherLogin() {
	const navigate = useNavigate();
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
		<LoginForm
			isLoading={isLoading}
			isError={isError}
			error={error}
			onFinish={onFinish}
			btnTextLogin="Увійти як учитель"
			linkToRegister="/register/teacher"
		/>
	);
}
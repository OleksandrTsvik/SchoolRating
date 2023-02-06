import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import useUserAuth from '../../../../hooks/useUserAuth';
import LoadingPage from '../../../../components/LoadingPage';
import { useLogoutMutation } from '../../../../api/auth/user/authStudentApi';

export default function LogoutPage() {
	const { isAuth } = useUserAuth();
	const [logout, { isLoading }] = useLogoutMutation();

	useEffect(() => {
		logout();
		// eslint-disable-next-line
	}, []);

	if (isLoading || isAuth) {
		return <LoadingPage />;
	}

	return (
		<Navigate to="/login" />
	);
}
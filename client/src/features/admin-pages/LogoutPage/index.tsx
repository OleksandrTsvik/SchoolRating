import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useLogoutMutation } from '../../../api/auth/admin/authAdminApi';
import useAdminAuth from '../../../hooks/useAdminAuth';
import LoadingPage from '../../../components/LoadingPage';

export default function LogoutPage() {
	const { isAuth } = useAdminAuth();
	const [logout, { isLoading }] = useLogoutMutation();

	useEffect(() => {
		logout();
		// eslint-disable-next-line
	}, []);

	if (isLoading || isAuth) {
		return <LoadingPage />;
	}

	return (
		<Navigate to="/admin/login" />
	);
}
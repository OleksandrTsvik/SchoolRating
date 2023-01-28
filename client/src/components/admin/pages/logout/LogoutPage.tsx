import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useLogoutMutation } from '../../../../api/auth/authAdminApi';
import LoadingPage from '../../../../utils/loading/LoadingPage';
import useAdminAuth from '../../../../hooks/useAdminAuth';

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
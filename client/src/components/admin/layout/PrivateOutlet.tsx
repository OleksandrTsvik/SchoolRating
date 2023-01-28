import { Navigate } from 'react-router-dom';

import useAdminAuth from '../../../hooks/useAdminAuth';
import { LayoutPage, LoadingPage } from '../pages';
import { useGetAdminQuery } from '../../../api/auth/authAdminApi';
import { useEffect } from 'react';

export function PrivateOutlet() {
	const auth = useAdminAuth();
	const { isLoading, isFetching } = useGetAdminQuery();

	console.log(`PrivateOutlet: isLoading = ${isLoading}, isFetching = ${isFetching}.`);
	console.log('Auth:', auth);
	// useEffect(() => {
	// 	console.log('PrivateOutlet');
	// });

	return (
		isLoading || isFetching
			? <LoadingPage />
			: auth.isAuth
				? <LayoutPage />
				: <Navigate to="/admin/login" />
	);
}

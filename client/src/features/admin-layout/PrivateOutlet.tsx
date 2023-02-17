import { Navigate } from 'react-router-dom';

import useAdminAuth from '../../hooks/useAdminAuth';
import { LayoutPage } from '../admin-pages';

export function PrivateOutlet() {
	const { isAuth } = useAdminAuth();
	console.log('PrivateOutlet')

	return (
		isAuth
			? <LayoutPage />
			: <Navigate to="/admin/login" replace />
	);
}

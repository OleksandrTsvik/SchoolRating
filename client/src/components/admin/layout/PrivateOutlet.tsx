import { Navigate } from 'react-router-dom';

import useAdminAuth from '../../../hooks/useAdminAuth';
import { LayoutPage } from '../pages';

export function PrivateOutlet() {
	const { isAuth } = useAdminAuth();

	return (
		isAuth
			? <LayoutPage />
			: <Navigate to="/admin/login" />
	);
}

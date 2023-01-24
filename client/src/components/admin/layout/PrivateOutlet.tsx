import { Navigate } from 'react-router-dom';

import useAdminAuth from '../../../hooks/useAdminAuth';
import { LayoutPage } from '../pages';

export function PrivateOutlet() {
	const auth = useAdminAuth();

	return (
		auth.isAuth
			? <LayoutPage />
			: <Navigate to="/admin/login" />
	);
}

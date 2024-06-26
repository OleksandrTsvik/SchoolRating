import { Navigate } from 'react-router-dom';

import useUserAuth from '../../hooks/useUserAuth';
import { LayoutPage } from '../user-pages';

export function PrivateOutlet() {
	const { isAuth } = useUserAuth();

	return (
		isAuth
			? <LayoutPage />
			: <Navigate to="/login" replace />
	);
}

import { Navigate } from 'react-router-dom';

import useUserAuth from '../../hooks/useUserAuth';
import { LayoutPage } from '../user-pages';

export function NoAuthOutlet() {
	const { isAuth } = useUserAuth();

	return (
		isAuth
			? <Navigate to="/" replace />
			: <LayoutPage />
	);
}

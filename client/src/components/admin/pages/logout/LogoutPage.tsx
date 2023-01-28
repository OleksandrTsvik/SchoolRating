import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../../../../api/auth/authAdminSlice';
import { useLogoutMutation } from '../../../../api/auth/authAdminApi';

export default function LogoutPage() {
	const dispatch = useDispatch();
	const [logout] = useLogoutMutation();

	useEffect(() => {
		logout();
		dispatch(logOut());
		// eslint-disable-next-line
	}, []);

	return (
		<Navigate to="/admin/login" />
	);
}
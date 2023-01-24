import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logOut } from '../../../../api/auth/authAdminSlice';

export default function LogoutPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logOut());
		// eslint-disable-next-line
	}, []);

	return (
		<Navigate to="/admin/login" />
	);
}
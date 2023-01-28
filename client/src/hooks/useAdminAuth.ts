import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentAdmin } from '../api/auth/authAdminSlice';
import { Role } from '../api/auth/role.enum';

export default function useAdminAuth() {
	const admin = useSelector(selectCurrentAdmin);

	return useMemo(() => ({
		admin,
		isAuth: admin && admin.role === Role.Admin
	}), [admin]);
}

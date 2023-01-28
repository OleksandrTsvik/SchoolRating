import { useMemo } from 'react';

import { selectCurrentAdmin } from '../api/auth/admin/authAdminSlice';
import { Role } from '../api/auth/role.enum';
import { useAppSelector } from '../store';

export default function useAdminAuth() {
	const admin = useAppSelector(selectCurrentAdmin);

	return useMemo(() => ({
		admin,
		isAuth: admin && admin.role === Role.Admin
	}), [admin]);
}

import { useMemo } from 'react';

import { useAppSelector } from '../store';
import { selectCurrentAdmin } from '../api/auth/admin/authAdminSlice';
import { Role } from '../models/role.enum';

export default function useAdminAuth() {
	const admin = useAppSelector(selectCurrentAdmin);

	return useMemo(() => ({
		admin,
		isAuth: admin && admin.role === Role.Admin
	}), [admin]);
}

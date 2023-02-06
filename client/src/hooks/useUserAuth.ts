import { useMemo } from 'react';

import { Role } from '../models/role.enum';
import { useAppSelector } from '../store';
import { selectCurrentUser } from '../api/auth/user/authUserSlice';

export default function useAdminAuth() {
	const user = useAppSelector(selectCurrentUser);

	return useMemo(() => ({
		user,
		isAuth: !!user,
		isStudent: user && user.role === Role.Student,
		isTeacher: user && user.role === Role.Teacher
	}), [user]);
}

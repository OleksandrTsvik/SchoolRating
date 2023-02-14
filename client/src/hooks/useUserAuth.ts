import { useMemo } from 'react';

import { useAppSelector } from '../store';
import { selectCurrentUser } from '../api/auth/user/authUserSlice';
import { Role } from '../models/role.enum';

export default function useUserAuth() {
	const user = useAppSelector(selectCurrentUser);

	return useMemo(() => ({
		user,
		isAuth: !!user,
		isStudent: user && user.role === Role.Student,
		isTeacher: user && user.role === Role.Teacher
	}), [user]);
}

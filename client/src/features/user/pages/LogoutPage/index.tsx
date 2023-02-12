import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import useUserAuth from '../../../../hooks/useUserAuth';
import LoadingPage from '../../../../components/LoadingPage';
import { useLogoutMutation as useStudentLogout } from '../../../../api/auth/user/authStudentApi';
import { useLogoutMutation as useTeacherLogout } from '../../../../api/auth/user/authTeacherApi';

export default function LogoutPage() {
	const { isAuth, isStudent, isTeacher } = useUserAuth();
	const [studentLogout, { isLoading: isStudentLoading }] = useStudentLogout();
	const [teacherLogout, { isLoading: isTeacherLoading }] = useTeacherLogout();

	useEffect(() => {
		if (isStudent) {
			studentLogout();
		} else if (isTeacher) {
			teacherLogout();
		}
		// eslint-disable-next-line
	}, []);

	if (isStudentLoading || isTeacherLoading || isAuth) {
		return <LoadingPage />;
	}

	return (
		<Navigate to="/login" />
	);
}
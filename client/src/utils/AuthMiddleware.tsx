import React from 'react';

import LoadingPage from '../components/LoadingPage';
import { useGetAdminQuery } from '../api/auth/admin/authAdminApi';
import { useGetStudentQuery } from '../api/auth/user/authStudentApi';
import { useGetTeacherQuery } from '../api/auth/user/authTeacherApi';

interface Props {
	children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
	const { isFetching: isAdminFetching } = useGetAdminQuery();
	const { isFetching: isStudentFetching } = useGetStudentQuery();
	const { isFetching: isTeacherFetching } = useGetTeacherQuery();

	if (isAdminFetching || isStudentFetching || isTeacherFetching) {
		return <LoadingPage />;
	}

	return (
		<>
			{children}
		</>
	);
}
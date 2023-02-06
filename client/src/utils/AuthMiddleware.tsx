import React from 'react';

import LoadingPage from '../components/LoadingPage';
import { useGetAdminQuery } from '../api/auth/admin/authAdminApi';
import { useGetStudentQuery } from '../api/auth/user/authStudentApi';

interface Props {
	children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
	const { isFetching: isAdminFetching } = useGetAdminQuery();
	const { isFetching: isStudentFetching } = useGetStudentQuery();

	if (isAdminFetching || isStudentFetching) {
		return <LoadingPage />;
	}

	return (
		<>
			{children}
		</>
	);
}
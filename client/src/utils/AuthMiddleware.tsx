import React from 'react';

import LoadingPage from './loading/LoadingPage';
import { useGetAdminQuery } from '../api/auth/admin/authAdminApi';

interface Props {
	children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
	const { isFetching } = useGetAdminQuery();

	if (isFetching) {
		return <LoadingPage />;
	}

	return (
		<>
			{children}
		</>
	);
}
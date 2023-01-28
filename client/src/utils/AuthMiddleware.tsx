import React, { useEffect, useState } from 'react';

import LoadingPage from './loading/LoadingPage';
import { useGetAdminQuery } from '../api/auth/authAdminApi';

interface Props {
	children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
	const { isFetching, isError } = useGetAdminQuery();
	const [loading, setLoading] = useState(isFetching);

	useEffect(() => {
		setLoading(isFetching && !isError);
	}, [isError, isFetching]);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			{children}
		</>
	);
}
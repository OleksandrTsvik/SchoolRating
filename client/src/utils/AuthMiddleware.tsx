import React from 'react';

import { useGetAdminQuery } from '../api/auth/admin/authAdminApi';
import { useGetStudentQuery } from '../api/auth/student/authStudentApi';
import { useGetTeacherQuery } from '../api/auth/teacher/authTeacherApi';
import { selectIsAdminStoreLoading } from '../api/auth/admin/authAdminSlice';
import { selectIsStudentStoreLoading } from '../api/auth/student/authStudentSlice';
import { selectIsTeacherStoreLoading } from '../api/auth/teacher/authTeacherSlice';
import LoadingPage from '../components/LoadingPage';
import { useAppSelector } from '../store';

interface Props {
	children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
	const { isFetching: isAdminFetching } = useGetAdminQuery();
	const { isFetching: isStudentFetching } = useGetStudentQuery();
	const { isFetching: isTeacherFetching } = useGetTeacherQuery();

	const isAdminStoreLoading = useAppSelector(selectIsAdminStoreLoading);
	const isStudentStoreLoading = useAppSelector(selectIsStudentStoreLoading);
	const isTeacherStoreLoading = useAppSelector(selectIsTeacherStoreLoading);

	if (
		isAdminFetching || isStudentFetching || isTeacherFetching ||
		isAdminStoreLoading || isStudentStoreLoading || isTeacherStoreLoading
	) {
		return <LoadingPage />;
	}

	return (
		<>
			{children}
		</>
	);
}

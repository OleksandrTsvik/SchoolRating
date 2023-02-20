import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { ITeacher } from '../../models/ITeacher';
import { logout } from '../auth/student/authStudentSlice';
import { urlTeacherRefresh } from '../config';

export interface GetRequest {
	id: string;
}

export const teacherService = createApi({
	reducerPath: 'teacherService',
	baseQuery: fetchBase('/teacher', logout, urlTeacherRefresh),
	endpoints: (builder) => ({
		getTeacher: builder.query<ITeacher, GetRequest>({
			query: ({ id }) => `/${id}`
		}),
		getGradebookClasses: builder.query<ITeacher, void>({
			query: () => '/gradebook'
		})
	})
});

export const {
	useGetTeacherQuery,
	useGetGradebookClassesQuery
} = teacherService;
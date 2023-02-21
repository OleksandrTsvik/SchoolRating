import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { ITeacher } from '../../models/ITeacher';
import { logout } from '../auth/student/authStudentSlice';
import { urlTeacherRefresh } from '../config';
import { IEducation } from '../../models/IEducation';

export interface GetTeacherRequest {
	id: string;
}

export interface GetGradebooksRequest {
	id: string;
}

export interface GetGradebookRequest {
	id: string;
}

export const teacherService = createApi({
	reducerPath: 'teacherService',
	baseQuery: fetchBase('/teacher', logout, urlTeacherRefresh),
	endpoints: (builder) => ({
		getTeacher: builder.query<ITeacher, GetTeacherRequest>({
			query: ({ id }) => `/${id}`
		}),
		getGradebooks: builder.query<IEducation[], GetGradebooksRequest>({
			query: ({ id }) => `/gradebooks/${id}`
		}),
		getGradebook: builder.query<IEducation[], GetGradebookRequest>({
			query: ({ id }) => `/gradebook/${id}`
		})
	})
});

export const {
	useGetTeacherQuery,
	useGetGradebooksQuery,
	useGetGradebookQuery
} = teacherService;
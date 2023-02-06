import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { urlAdminRefresh } from '../config';
import { IStudent } from '../../models/IStudent';

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const adminStudentService = createApi({
	reducerPath: 'adminStudentService',
	baseQuery: fetchBase('/student', logout, urlAdminRefresh),
	tagTypes: ['Student'],
	endpoints: (builder) => ({
		getStudents: builder.query<IStudent[], void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['Student']
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: (data) => ({
				url: '/auth/register',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Student']
		})
	})
});

export const {
	useGetStudentsQuery,
	useRegisterMutation
} = adminStudentService;
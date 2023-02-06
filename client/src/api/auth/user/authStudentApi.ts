import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../../fetchBase';
import { logout, User } from './authUserSlice';
import { urlStudentRefresh } from '../../config';

export interface LoginRequest {
	email: string;
	password: string;
}

export const authStudentApi = createApi({
	reducerPath: 'authStudentApi',
	baseQuery: fetchBase('/student/auth', logout, urlStudentRefresh),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginRequest>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data
			})
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST'
			})
		}),
		getStudent: builder.query<User, void>({
			query: () => ({
				url: '/me'
			})
		})
	})
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetStudentQuery
} = authStudentApi;
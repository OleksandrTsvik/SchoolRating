import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../../fetchBase';
import { logout, User } from './authUserSlice';
import { urlTeacherRefresh } from '../../config';
import { logoutOnQueryStarted, setUserOnQueryStarted } from './userOnQueryStarted';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const authTeacherApi = createApi({
	reducerPath: 'authTeacherApi',
	baseQuery: fetchBase('/teacher/auth', logout, urlTeacherRefresh),
	endpoints: (builder) => ({
		login: builder.mutation<User, LoginRequest>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data
			}),
			onQueryStarted: setUserOnQueryStarted
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				body: data
			})
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST'
			}),
			onQueryStarted: logoutOnQueryStarted
		}),
		getTeacher: builder.query<User, void>({
			query: () => ({
				url: '/me'
			}),
			onQueryStarted: setUserOnQueryStarted
		})
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetTeacherQuery
} = authTeacherApi;
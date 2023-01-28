import { createApi } from '@reduxjs/toolkit/query/react';
import { Role } from '../role.enum';
import authAdminFetchBase from './authAdminFetchBase';

export interface Admin {
	id: string;
	role: Role;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface ApiError {
	data: {
		error: string,
		message: string,
		statusCode: number
	};
	status: number;
}

export const authAdminApi = createApi({
	baseQuery: authAdminFetchBase,
	endpoints: (builder) => ({
		login: builder.mutation<Admin, LoginRequest>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials
			})
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST'
			})
		}),
		getAdmin: builder.query<Admin, void>({
			query: () => ({
				url: '/me'
			})
		})
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetAdminQuery
} = authAdminApi;
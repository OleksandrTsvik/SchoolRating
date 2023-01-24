import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';
import { Role } from './role.enum';

export interface Admin {
	email: string;
	role: Role;
}

export interface AdminResponse {
	user: Admin;
	token: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface CustomError {
	data: {
		error: string,
		message: string,
		statusCode: number
	};
	status: number;
}

export const authAdminApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/api/admin',
		prepareHeaders: (headers, { getState }) => {
			const { token } = (getState() as RootState).authAdmin;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		}
	}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
	endpoints: (builder) => ({
		login: builder.mutation<AdminResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			})
		})
	}),
});

export const { useLoginMutation } = authAdminApi;
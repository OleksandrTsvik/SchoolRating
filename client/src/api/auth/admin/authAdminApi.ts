import { createApi } from '@reduxjs/toolkit/query/react';
import { Role } from '../role.enum';
import fetchBase from '../../fetchBase';
import { logout } from './authAdminSlice';

export interface Admin {
	id: string;
	email: string;
	role: Role;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export const authAdminApi = createApi({
	reducerPath: 'authAdminApi',
	baseQuery: fetchBase('/admin/auth', logout),
	endpoints: (builder) => ({
		login: builder.mutation<Admin, LoginRequest>({
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
		getAdmin: builder.query<Admin, void>({
			query: () => ({
				url: '/me'
			})
		})
	})
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetAdminQuery
} = authAdminApi;
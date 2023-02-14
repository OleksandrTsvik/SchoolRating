import { createApi } from '@reduxjs/toolkit/query/react';
import { Role } from '../../../models/role.enum';
import { urlAdminRefresh } from '../../config';
import fetchBase from '../../fetchBase';
import { logout } from './authAdminSlice';
import { logoutOnQueryStarted, setAdminOnQueryStarted } from './adminOnQueryStarted';

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
	baseQuery: fetchBase('/admin/auth', logout, urlAdminRefresh),
	endpoints: (builder) => ({
		login: builder.mutation<Admin, LoginRequest>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data
			}),
			onQueryStarted: setAdminOnQueryStarted
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST'
			}),
			onQueryStarted: logoutOnQueryStarted
		}),
		getAdmin: builder.query<Admin, void>({
			query: () => ({
				url: '/me'
			}),
			onQueryStarted: setAdminOnQueryStarted
		})
	})
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetAdminQuery
} = authAdminApi;
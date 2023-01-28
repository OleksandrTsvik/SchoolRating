import { createApi } from '@reduxjs/toolkit/query/react';
import { Role } from './role.enum';
import authAdminFetchBase from './authAdminFetchBase';
import { setAdmin } from './authAdminSlice';

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
	tagTypes: ['Admin'],
	endpoints: (builder) => ({
		login: builder.mutation<Admin, LoginRequest>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
				providesTags: ['Admin'],
				credentials: 'include'
			})
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
				providesTags: ['Admin'],
				credentials: 'include'
			})
		}),
		getAdmin: builder.query<Admin, void>({
			query: () => ({
				url: '/me',
				providesTags: ['Admin'],
				credentials: 'include'
			}),
			transformResponse: (result: Admin) => result,
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setAdmin(data));
				} catch (error) {
					// console.log(error);
				}
			}
		})
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetAdminQuery
} = authAdminApi;
import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { IAdmin } from '../../models/IAdmin';

export interface ChangePasswordRequest {
	id: string;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
}

export interface DeleteRequest {
	id: string;
}

export const adminService = createApi({
	reducerPath: 'adminService',
	baseQuery: fetchBase('/admin', logout, '/auth/refresh'),
	tagTypes: ['Admin'],
	endpoints: (builder) => ({
		getAdmins: builder.query<IAdmin[], void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['Admin']
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: (data) => ({
				url: '/auth/register',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Admin']
		}),
		changePassword: builder.mutation<void, ChangePasswordRequest>({
			query: (data) => ({
				url: `/change-password/${data.id}`,
				method: 'PATCH',
				body: data
			})
		}),
		delete: builder.mutation<void, DeleteRequest>({
			query: (data) => ({
				url: `/${data.id}`,
				method: 'DELETE'
			}),
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(logout());
				} catch (error) {
					// console.log(error);
				}
			}
		})
	})
});

export const {
	useGetAdminsQuery,
	useRegisterMutation,
	useChangePasswordMutation,
	useDeleteMutation
} = adminService;
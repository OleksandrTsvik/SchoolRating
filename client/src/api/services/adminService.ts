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

export const adminService = createApi({
	reducerPath: 'adminService',
	baseQuery: fetchBase('/admin', logout, '/auth/refresh'),
	endpoints: (builder) => ({
		getAdmins: builder.query<IAdmin[], void>({
			query: () => ({
				url: ''
			})
		}),
		changePassword: builder.mutation<void, ChangePasswordRequest>({
			query: (data) => ({
				url: `/change-password/${data.id}`,
				method: 'PATCH',
				body: data
			})
		})
	})
});

export const {
	useGetAdminsQuery,
	useChangePasswordMutation
} = adminService;
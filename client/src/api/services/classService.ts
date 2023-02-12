import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { IClass } from '../../models/IClass';
import { urlAdminRefresh } from '../config';

export interface CreateRequest {
	name: string;
}

export interface EditRequest {
	id: string;
	name: string;
}

export interface DeleteRequest {
	id: string;
}

export const classService = createApi({
	reducerPath: 'classService',
	baseQuery: fetchBase('/class', logout, urlAdminRefresh),
	tagTypes: ['Class'],
	endpoints: (builder) => ({
		getClasses: builder.query<IClass[], void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['Class']
		}),
		add: builder.mutation<void, CreateRequest>({
			query: (data) => ({
				url: '/',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Class']
		}),
		edit: builder.mutation<void, EditRequest>({
			query: (data) => ({
				url: `/${data.id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Class']
		}),
		delete: builder.mutation<void, DeleteRequest>({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Class']
		})
	})
});

export const {
	useGetClassesQuery,
	useAddMutation,
	useEditMutation,
	useDeleteMutation
} = classService;
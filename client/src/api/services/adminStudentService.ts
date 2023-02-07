import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { urlAdminRefresh } from '../config';
import { IStudent } from '../../models/IStudent';

export interface AddRequest {
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
}

export interface EditRequest {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
}

export interface DeleteRequest {
	id: string;
}

export const adminStudentService = createApi({
	reducerPath: 'adminStudentService',
	baseQuery: fetchBase('/student', logout, urlAdminRefresh),
	tagTypes: ['Student'],
	endpoints: (builder) => ({
		getStudents: builder.query<IStudent[], void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['Student']
		}),
		add: builder.mutation<void, AddRequest>({
			query: (data) => ({
				url: '',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Student']
		}),
		edit: builder.mutation<void, EditRequest>({
			query: (data) => ({
				url: `/${data.id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Student']
		}),
		delete: builder.mutation<void, DeleteRequest>({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Student']
		})
	})
});

export const {
	useGetStudentsQuery,
	useAddMutation,
	useEditMutation,
	useDeleteMutation
} = adminStudentService;
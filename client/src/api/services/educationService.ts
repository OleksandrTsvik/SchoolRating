import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { urlAdminRefresh } from '../config';
import { IEducation } from '../../models/IEducation';

export interface CreateRequest {
	teacherId: string;
	classId: string;
	subjectId: string;
}

export interface EditRequest {
	id: string;
	teacherId: string;
	classId: string;
	subjectId: string;
}

export interface DeleteRequest {
	id: string;
}

export const educationService = createApi({
	reducerPath: 'educationService',
	baseQuery: fetchBase('/education', logout, urlAdminRefresh),
	tagTypes: ['Education'],
	endpoints: (builder) => ({
		getEducations: builder.query<IEducation[], void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['Education']
		}),
		add: builder.mutation<void, CreateRequest>({
			query: (data) => ({
				url: '/',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Education']
		}),
		edit: builder.mutation<void, EditRequest>({
			query: (data) => ({
				url: `/${data.id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Education']
		}),
		delete: builder.mutation<void, DeleteRequest>({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Education']
		})
	})
});

export const {
	useGetEducationsQuery,
	useAddMutation,
	useEditMutation,
	useDeleteMutation
} = educationService;
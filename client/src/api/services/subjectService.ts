import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { ISubject } from '../../models/ISubject';
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

export const subjectService = createApi({
	reducerPath: 'subjectService',
	baseQuery: fetchBase('/subject', logout, urlAdminRefresh),
	tagTypes: ['Subject'],
	endpoints: (builder) => ({
		getSubjects: builder.query<ISubject[], void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['Subject']
		}),
		add: builder.mutation<void, CreateRequest>({
			query: (data) => ({
				url: '/',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Subject']
		}),
		edit: builder.mutation<void, EditRequest>({
			query: (data) => ({
				url: `/${data.id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Subject']
		}),
		delete: builder.mutation<void, DeleteRequest>({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Subject']
		})
	})
});

export const {
	useGetSubjectsQuery,
	useAddMutation,
	useEditMutation,
	useDeleteMutation
} = subjectService;
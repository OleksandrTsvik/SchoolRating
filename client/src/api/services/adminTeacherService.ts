import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { urlAdminRefresh } from '../config';
import { ITeacher } from '../../models/ITeacher';
import getObjectWithoutNullValues from '../../utils/getObjectWithoutNullValues';

export interface GetTeachersRequest {
	page: number;
	limit: number;

	[key: string]: string | number | null;
}

export interface GetTeachersResponse {
	data: ITeacher[];
	total: number;
}

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

export const adminTeacherService = createApi({
	reducerPath: 'adminTeacherService',
	baseQuery: fetchBase('/teacher', logout, urlAdminRefresh),
	tagTypes: ['Teacher'],
	endpoints: (builder) => ({
		getTeachers: builder.query<GetTeachersResponse, GetTeachersRequest>({
			query: (params) => ({
				url: '',
				params: getObjectWithoutNullValues(params)
			}),
			providesTags: ['Teacher']
		}),
		add: builder.mutation<void, AddRequest>({
			query: (data) => ({
				url: '',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Teacher']
		}),
		edit: builder.mutation<void, EditRequest>({
			query: (data) => ({
				url: `/${data.id}`,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Teacher']
		}),
		delete: builder.mutation<void, DeleteRequest>({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Teacher']
		})
	})
});

export const {
	useGetTeachersQuery,
	useAddMutation,
	useEditMutation,
	useDeleteMutation
} = adminTeacherService;
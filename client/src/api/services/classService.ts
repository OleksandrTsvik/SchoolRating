import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { logout } from '../auth/admin/authAdminSlice';
import { IClass } from '../../models/IClass';
import { urlAdminRefresh } from '../config';
import getObjectWithoutNullValues from '../../utils/getObjectWithoutNullValues';
import { GetStudentsRequest, GetStudentsResponse } from './adminStudentService';

export interface GetOneRequest {
	id: string;
}

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

export interface AddStudentRequest {
	classId: string;
	studentId: string;
}

export interface RemoveStudentRequest {
	studentId: string;
}

export const classService = createApi({
	reducerPath: 'classService',
	baseQuery: fetchBase('/class', logout, urlAdminRefresh),
	tagTypes: ['Class', 'ClassStudents'],
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
			invalidatesTags: ['Class', 'ClassStudents']
		}),
		getClass: builder.query<IClass, GetOneRequest>({
			query: ({ id }) => ({
				url: `/${id}`
			}),
			providesTags: ['ClassStudents']
		}),
		addStudent: builder.mutation<void, AddStudentRequest>({
			query: ({ classId, studentId }) => ({
				url: `${classId}/add-student/${studentId}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['ClassStudents', 'Class']
		}),
		removeStudent: builder.mutation<void, RemoveStudentRequest>({
			query: ({ studentId }) => ({
				url: `remove-student/${studentId}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['ClassStudents', 'Class']
		}),
		getStudentsWithoutClass: builder.query<GetStudentsResponse, GetStudentsRequest>({
			query: (params) => ({
				url: 'students/without-class',
				params: {
					...getObjectWithoutNullValues(params),
					isWithoutClass: true
				}
			}),
			providesTags: ['ClassStudents']
		})
	})
});

export const {
	useGetClassesQuery,
	useAddMutation,
	useEditMutation,
	useDeleteMutation,
	useGetClassQuery,
	useAddStudentMutation,
	useRemoveStudentMutation,
	useGetStudentsWithoutClassQuery
} = classService;
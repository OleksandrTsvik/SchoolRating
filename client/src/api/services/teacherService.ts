import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { ITeacher } from '../../models/ITeacher';
import { logout } from '../auth/student/authStudentSlice';
import { urlTeacherRefresh } from '../config';
import { IEducation } from '../../models/IEducation';

export interface GetTeacherRequest {
	id: string;
}

export interface GetGradebooksRequest {
	id: string;
}

export interface GetGradebookRequest {
	id: string;
}

export interface AddRatingColumnRequest {
	educationId: string;
	date: Date;
}

export interface RatingColumnRequest {
	ratingIds: string[];
}

export interface UpdateDateRatingColumnRequest {
	date: string;
	ratingIds: string[];
}

export interface UpdateDescriptionRatingColumnRequest {
	description: string;
	ratingIds: string[];
}

export const teacherService = createApi({
	reducerPath: 'teacherService',
	baseQuery: fetchBase('/teacher', logout, urlTeacherRefresh),
	tagTypes: ['Rating', 'Description'],
	endpoints: (builder) => ({
		getTeacher: builder.query<ITeacher, GetTeacherRequest>({
			query: ({ id }) => `/${id}`
		}),
		getGradebooks: builder.query<IEducation[], GetGradebooksRequest>({
			query: ({ id }) => `/gradebooks/${id}`
		}),
		getGradebook: builder.query<IEducation, GetGradebookRequest>({
			query: ({ id }) => `/gradebook/${id}`,
			providesTags: ['Rating']
		}),
		addRatingColumn: builder.mutation<void, AddRatingColumnRequest>({
			query: (data) => ({
				url: '/add-rating-column',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Rating']
		}),
		removeRatingColumn: builder.mutation<void, RatingColumnRequest>({
			query: (data) => ({
				url: '/remove-rating-column',
				method: 'DELETE',
				body: data
			}),
			invalidatesTags: ['Rating']
		}),
		updateDateRatingColumn: builder.mutation<void, UpdateDateRatingColumnRequest>({
			query: (data) => ({
				url: '/update-date-rating-column',
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Rating']
		}),
		updateDescriptionRatingColumn: builder.mutation<void, UpdateDescriptionRatingColumnRequest>({
			query: (data) => ({
				url: '/update-description-rating-column',
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Rating', 'Description']
		}),
		getDescriptions: builder.query<string[], void>({
			query: () => '../rating/descriptions',
			providesTags: ['Description']
		})
	})
});

export const {
	useGetTeacherQuery,
	useGetGradebooksQuery,
	useGetGradebookQuery,
	useAddRatingColumnMutation,
	useRemoveRatingColumnMutation,
	useUpdateDateRatingColumnMutation,
	useUpdateDescriptionRatingColumnMutation,
	useGetDescriptionsQuery
} = teacherService;
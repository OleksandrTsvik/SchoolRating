import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { ITeacher } from '../../models/ITeacher';
import { logout } from '../auth/student/authStudentSlice';
import { urlTeacherRefresh } from '../config';
import { IEducation } from '../../models/IEducation';
import { ISemester } from '../../models/ISemester';

export interface GetTeacherRequest {
	id: string;
}

export interface GetGradebooksRequest {
	id: string;
}

export interface GetGradebookRequest {
	id: string;
	start?: string;
	end?: string;
}

export interface AddRatingColumnRequest {
	studentIds: string[];
	educationId: string;
	date: Date;
}

export interface RatingColumnRequest {
	ratingIds: string[];
}

export interface UpdateDateRatingColumnRequest {
	studentIds: string[];
	date: string;
	ratingIds: string[];
}

export interface UpdateDescriptionRatingColumnRequest {
	description: string;
	ratingIds: string[];
}

export interface UpdateRatingRequest {
	id: string;
	isPresence: boolean;
	mark: number | null;
}

export interface GetGradebookResponse {
	education: IEducation;
	semesters: ISemester[];
	dateStartRating: string;
	dateEndRating: string;
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
		getGradebook: builder.query<GetGradebookResponse, GetGradebookRequest>({
			query: (data) => ({
				url: `/gradebook/${data.id}`,
				params: {
					start: data.start,
					end: data.end
				}
			}),
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
			invalidatesTags: ['Rating', 'Description']
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
		updateRating: builder.mutation<void, UpdateRatingRequest>({
			query: (data) => ({
				url: '/update-rating',
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ['Rating']
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
	useUpdateRatingMutation,
	useGetDescriptionsQuery
} = teacherService;
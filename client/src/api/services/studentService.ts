import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { IStudent } from '../../models/IStudent';
import { logout } from '../auth/student/authStudentSlice';
import { urlStudentRefresh } from '../config';
import { IRating } from '../../models/IRating';
import { ISemester } from '../../models/ISemester';

export interface GetRequest {
	id: string;
}

export interface GetDiaryRequest {
	start?: string;
	end?: string;
}

export interface GetDiaryResponse {
	ratings: IRating[];
	semesters: ISemester[];
	dateStartRating: string;
	dateEndRating: string;
}

export const studentService = createApi({
	reducerPath: 'studentService',
	baseQuery: fetchBase('/student', logout, urlStudentRefresh),
	endpoints: (builder) => ({
		getStudent: builder.query<IStudent, GetRequest>({
			query: ({ id }) => `/${id}`
		}),
		getDiary: builder.query<GetDiaryResponse, GetDiaryRequest>({
			query: (data) => ({
				url: 'diary',
				params: data
			})
		})
	})
});

export const {
	useGetStudentQuery,
	useGetDiaryQuery
} = studentService;
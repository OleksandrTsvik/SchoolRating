import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../fetchBase';
import { IStudent } from '../../models/IStudent';
import { logout } from '../auth/user/authUserSlice';
import { urlStudentRefresh } from '../config';

export interface GetRequest {
	id: string;
}

export const studentService = createApi({
	reducerPath: 'studentService',
	baseQuery: fetchBase('/student', logout, urlStudentRefresh),
	endpoints: (builder) => ({
		getStudent: builder.query<IStudent, GetRequest>({
			query: ({ id }) => ({
				url: `/${id}`
			})
		})
	})
});

export const {
	useGetStudentQuery
} = studentService;
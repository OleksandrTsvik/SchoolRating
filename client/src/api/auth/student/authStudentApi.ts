import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../../fetchBase';
import {
	logout,
	Student,
	LoginRequest,
	RegisterRequest,
	setStudent,
	setIsStudentStoreLoading
} from './authStudentSlice';
import { urlStudentRefresh } from '../../config';

export const authStudentApi = createApi({
	reducerPath: 'authStudentApi',
	baseQuery: fetchBase('/student/auth', logout, urlStudentRefresh),
	endpoints: (builder) => ({
		login: builder.mutation<Student, LoginRequest>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data
			}),
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setStudent(data));
				} catch (error) {
					// console.log(error);
				}
			}
		}),
		register: builder.mutation<void, RegisterRequest>({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				body: data
			})
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: '/logout',
				method: 'POST'
			}),
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(logout());
				} catch (error) {
					// console.log(error);
				}
			}
		}),
		getStudent: builder.query<Student, void>({
			query: () => ({
				url: '/me'
			}),
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				dispatch(setIsStudentStoreLoading(true));

				try {
					const { data } = await queryFulfilled;
					dispatch(setStudent(data));
				} catch (error) {
					// console.log(error);
				} finally {
					dispatch(setIsStudentStoreLoading(false));
				}
			}
		})
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetStudentQuery
} = authStudentApi;

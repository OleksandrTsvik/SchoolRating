import { createApi } from '@reduxjs/toolkit/query/react';
import fetchBase from '../../fetchBase';
import {
	logout,
	Teacher,
	LoginRequest,
	RegisterRequest,
	setTeacher,
	setIsTeacherStoreLoading
} from './authTeacherSlice';
import { urlTeacherRefresh } from '../../config';

export const authTeacherApi = createApi({
	reducerPath: 'authTeacherApi',
	baseQuery: fetchBase('/teacher/auth', logout, urlTeacherRefresh),
	endpoints: (builder) => ({
		login: builder.mutation<Teacher, LoginRequest>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data
			}),
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setTeacher(data));
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
		getTeacher: builder.query<Teacher, void>({
			query: () => '/me',
			onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
				dispatch(setIsTeacherStoreLoading(true));

				try {
					const { data } = await queryFulfilled;
					dispatch(setTeacher(data));
				} catch (error) {
					// console.log(error);
				} finally {
					dispatch(setIsTeacherStoreLoading(false));
				}
			}
		}),
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useGetTeacherQuery
} = authTeacherApi;

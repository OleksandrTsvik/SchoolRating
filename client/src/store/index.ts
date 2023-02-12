import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authAdminApi } from '../api/auth/admin/authAdminApi';
import { authStudentApi } from '../api/auth/user/authStudentApi';
import { authTeacherApi } from '../api/auth/user/authTeacherApi';
import { adminService } from '../api/services/adminService';
import { adminStudentService } from '../api/services/adminStudentService';
import { adminTeacherService } from '../api/services/adminTeacherService';
import { subjectService } from '../api/services/subjectService';
import { classService } from '../api/services/classService';
import authAdminReducer from '../api/auth/admin/authAdminSlice';
import authUserReducer from '../api/auth/user/authUserSlice';

export const store = configureStore({
	reducer: combineReducers({
		[authAdminApi.reducerPath]: authAdminApi.reducer,
		[authStudentApi.reducerPath]: authStudentApi.reducer,
		[authTeacherApi.reducerPath]: authTeacherApi.reducer,
		[adminService.reducerPath]: adminService.reducer,
		[adminStudentService.reducerPath]: adminStudentService.reducer,
		[adminTeacherService.reducerPath]: adminTeacherService.reducer,
		[subjectService.reducerPath]: subjectService.reducer,
		[classService.reducerPath]: classService.reducer,
		authAdmin: authAdminReducer,
		authUser: authUserReducer
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat(
			authAdminApi.middleware,
			authStudentApi.middleware,
			authTeacherApi.middleware,
			adminService.middleware,
			adminStudentService.middleware,
			adminTeacherService.middleware,
			subjectService.middleware,
			classService.middleware
		),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
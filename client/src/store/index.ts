import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authAdminApi } from '../api/auth/admin/authAdminApi';
import { authStudentApi } from '../api/auth/user/authStudentApi';
import { adminService } from '../api/services/adminService';
import { adminStudentService } from '../api/services/adminStudentService';
import { subjectService } from '../api/services/subjectService';
import authAdminReducer from '../api/auth/admin/authAdminSlice';
import authUserReducer from '../api/auth/user/authUserSlice';

export const store = configureStore({
	reducer: combineReducers({
		[authAdminApi.reducerPath]: authAdminApi.reducer,
		[authStudentApi.reducerPath]: authStudentApi.reducer,
		[adminService.reducerPath]: adminService.reducer,
		[adminStudentService.reducerPath]: adminStudentService.reducer,
		[subjectService.reducerPath]: subjectService.reducer,
		authAdmin: authAdminReducer,
		authUser: authUserReducer
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat(
			authAdminApi.middleware,
			authStudentApi.middleware,
			adminService.middleware,
			adminStudentService.middleware,
			subjectService.middleware
		),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
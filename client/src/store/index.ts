import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authAdminApi } from '../api/auth/admin/authAdminApi';
import { authStudentApi } from '../api/auth/student/authStudentApi';
import { authTeacherApi } from '../api/auth/teacher/authTeacherApi';
import { adminService } from '../api/services/adminService';
import { adminStudentService } from '../api/services/adminStudentService';
import { adminTeacherService } from '../api/services/adminTeacherService';
import { subjectService } from '../api/services/subjectService';
import { classService } from '../api/services/classService';
import { educationService } from '../api/services/educationService';
import { studentService } from '../api/services/studentService';
import { teacherService } from '../api/services/teacherService';
import authAdminReducer from '../api/auth/admin/authAdminSlice';
import authStudentReducer from '../api/auth/student/authStudentSlice';
import authTeacherReducer from '../api/auth/teacher/authTeacherSlice';

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
		[educationService.reducerPath]: educationService.reducer,
		[studentService.reducerPath]: studentService.reducer,
		[teacherService.reducerPath]: teacherService.reducer,
		authAdmin: authAdminReducer,
		authStudent: authStudentReducer,
		authTeacher: authTeacherReducer
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
			classService.middleware,
			educationService.middleware,
			studentService.middleware,
			teacherService.middleware
		),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
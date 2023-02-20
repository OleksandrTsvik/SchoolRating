import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface Teacher {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
}

interface initState {
	teacher: Teacher | null | undefined;
	isTeacherStoreLoading: boolean;
}

const initialState: initState = {
	teacher: null,
	isTeacherStoreLoading: false
};

const authTeacherSlice: any = createSlice({
	name: 'authTeacher',
	initialState: initialState,
	reducers: {
		setTeacher: (state, { payload }: PayloadAction<Teacher>) => {
			state.teacher = payload;
		},
		logout: (state) => {
			state.teacher = null;
		},
		setIsTeacherStoreLoading(state, action: PayloadAction<boolean>) {
			state.isTeacherStoreLoading = action.payload;
		}
	}
});

export default authTeacherSlice.reducer;

export const { logout, setTeacher, setIsTeacherStoreLoading } = authTeacherSlice.actions;

export const selectCurrentTeacher = (state: RootState) => state.authTeacher.teacher;
export const selectIsTeacherStoreLoading = (state: RootState) => state.authTeacher.isTeacherStoreLoading;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { setIsTeacherStoreLoading } from '../teacher/authTeacherSlice';

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

export interface Student {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
}

interface initState {
	student: Student | null | undefined;
	isStudentStoreLoading: boolean;
}

const initialState: initState = {
	student: null,
	isStudentStoreLoading: false
};

const authStudentSlice: any = createSlice({
	name: 'authStudent',
	initialState: initialState,
	reducers: {
		setStudent: (state, { payload }: PayloadAction<Student>) => {
			state.student = payload;
		},
		logout: (state) => {
			state.student = null;
		},
		setIsStudentStoreLoading(state, action: PayloadAction<boolean>) {
			state.isStudentStoreLoading = action.payload;
		}
	}
});

export default authStudentSlice.reducer;

export const { logout, setStudent, setIsStudentStoreLoading } = authStudentSlice.actions;

export const selectCurrentStudent = (state: RootState) => state.authStudent.student;
export const selectIsStudentStoreLoading = (state: RootState) => state.authStudent.isStudentStoreLoading;
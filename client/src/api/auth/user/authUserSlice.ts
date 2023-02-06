import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Role } from '../../../models/role.enum';
import { authStudentApi } from './authStudentApi';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
	role: Role;
}

interface initState {
	user: User | null | undefined;
}

const initialState: initState = {
	user: null
};

const authUserSlice: any = createSlice({
	name: 'authUser',
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
		}
	},
	extraReducers: (builder) => builder
		.addMatcher(
			authStudentApi.endpoints.login.matchFulfilled,
			(state, { payload }: PayloadAction<User>) => {
				state.user = payload;
			})
		.addMatcher(
			authStudentApi.endpoints.logout.matchFulfilled,
			(state: RootState) => {
				state.user = null;
			})
		.addMatcher(
			authStudentApi.endpoints.getStudent.matchFulfilled,
			(state, { payload }: PayloadAction<User>) => {
				state.user = payload;
			})
});

export default authUserSlice.reducer;

export const { logout } = authUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.authUser.user;
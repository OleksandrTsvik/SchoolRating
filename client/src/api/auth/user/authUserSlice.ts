import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Role } from '../../../models/role.enum';

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
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.user = payload;
		},
		logout: (state) => {
			state.user = null;
		}
	}
});

export default authUserSlice.reducer;

export const { logout, setUser } = authUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.authUser.user;
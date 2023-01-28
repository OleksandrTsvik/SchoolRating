import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { User } from './authUserApi';

interface initState {
	user: User | null | undefined;
}

const initialState: initState = {
	user: null
};

const authUserSlice = createSlice({
	name: 'authUser',
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
		}
	}
});

export default authUserSlice.reducer;

export const { logout } = authUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.authUser.user;
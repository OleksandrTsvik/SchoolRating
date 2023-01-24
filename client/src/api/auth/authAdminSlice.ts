import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Admin } from './authAdminApi';
import { RootState } from '../../store';

interface initState {
	user: Admin | null;
	token: string | null;
}

interface Credentials {
	user: Admin;
	token: string;
}

const dataLocalStorage = localStorage.getItem('admin');
let user = null;
let token = null;

if (dataLocalStorage) {
	const data = JSON.parse(dataLocalStorage) as initState;
	user = data.user;
	token = data.token;
}

const initialState: initState = {
	user,
	token
};

const authSlice = createSlice({
	name: 'authAdmin',
	initialState: initialState,
	reducers: {
		logIn: (state, action: PayloadAction<Credentials>) => {
			const { user, token } = action.payload;
			localStorage.setItem('admin', JSON.stringify({ user, token } as initState));
			state.user = user;
			state.token = token;
		},
		logOut: (state) => {
			localStorage.removeItem('admin');
			state.user = null;
			state.token = null;
		}
	},
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAdmin = (state: RootState) => state.authAdmin.user;
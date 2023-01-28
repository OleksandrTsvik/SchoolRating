import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Admin } from './authAdminApi';
import { RootState } from '../../store';

interface initState {
	admin: Admin | null | undefined;
}

const initialState: initState = {
	admin: null
};

const authSlice = createSlice({
	name: 'authAdmin',
	initialState: initialState,
	reducers: {
		logIn: (state, action: PayloadAction<Admin>) => {
			state.admin = action.payload;
		},
		setAdmin: (state, action: PayloadAction<Admin | undefined>) => {
			state.admin = action.payload;
		},
		logOut: (state) => {
			state.admin = null;
		}
	},
});

export const { logIn, logOut, setAdmin } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAdmin = (state: RootState) => state.authAdmin.admin;
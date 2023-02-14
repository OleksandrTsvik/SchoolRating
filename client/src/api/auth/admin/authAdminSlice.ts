import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Admin } from './authAdminApi';

interface initState {
	admin: Admin | null | undefined;
}

const initialState: initState = {
	admin: null
};

const authAdminSlice: any = createSlice({
	name: 'authAdmin',
	initialState: initialState,
	reducers: {
		setAdmin: (state, { payload }: PayloadAction<Admin>) => {
			state.admin = payload;
		},
		logout: (state) => {
			state.admin = null;
		}
	}
});

export default authAdminSlice.reducer;

export const { logout, setAdmin } = authAdminSlice.actions;

export const selectCurrentAdmin = (state: RootState) => state.authAdmin.admin;
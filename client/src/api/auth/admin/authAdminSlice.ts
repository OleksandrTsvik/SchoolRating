import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin, authAdminApi } from './authAdminApi';
import { RootState } from '../../../store';

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
		logout: (state) => {
			state.admin = null;
		}
	},
	extraReducers: (builder) => builder
		.addMatcher(
			authAdminApi.endpoints.login.matchFulfilled,
			(state, { payload }: PayloadAction<Admin>) => {
				state.admin = payload;
			})
		.addMatcher(
			authAdminApi.endpoints.logout.matchFulfilled,
			(state: RootState) => {
				state.admin = null;
			})
		.addMatcher(
			authAdminApi.endpoints.getAdmin.matchFulfilled,
			(state, { payload }: PayloadAction<Admin>) => {
				state.admin = payload;
			})
});

export default authAdminSlice.reducer;

export const { logout } = authAdminSlice.actions;

export const selectCurrentAdmin = (state: RootState) => state.authAdmin.admin;
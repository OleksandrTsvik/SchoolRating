import { createSlice } from '@reduxjs/toolkit';
import { Admin, authAdminApi } from './authAdminApi';
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
		logout: (state) => {
			state.admin = null;
		}
	},
	extraReducers: (builder) => builder
		.addMatcher<Admin>(
			authAdminApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.admin = payload;
			})
		.addMatcher<void>(
			authAdminApi.endpoints.logout.matchFulfilled,
			(state) => {
				state.admin = null;
			})
		.addMatcher<Admin>(
			authAdminApi.endpoints.getAdmin.matchFulfilled,
			(state, { payload }) => {
				state.admin = payload;
			})
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAdmin = (state: RootState) => state.authAdmin.admin;
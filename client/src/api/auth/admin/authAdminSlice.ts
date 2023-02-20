import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Admin } from './authAdminApi';

interface initState {
	admin: Admin | null | undefined;
	isAdminStoreLoading: boolean;
}

const initialState: initState = {
	admin: null,
	isAdminStoreLoading: false
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
		},
		setIsAdminStoreLoading(state, action: PayloadAction<boolean>) {
			state.isAdminStoreLoading = action.payload;
		}
	}
});

export default authAdminSlice.reducer;

export const { logout, setAdmin, setIsAdminStoreLoading } = authAdminSlice.actions;

export const selectCurrentAdmin = (state: RootState) => state.authAdmin.admin;
export const selectIsAdminStoreLoading = (state: RootState) => state.authAdmin.isAdminStoreLoading;
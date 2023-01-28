import { configureStore } from '@reduxjs/toolkit';
import { authAdminApi } from '../api/auth/authAdminApi';
import authAdminReducer from '../api/auth/authAdminSlice';

export const store = configureStore({
	reducer: {
		[authAdminApi.reducerPath]: authAdminApi.reducer,
		authAdmin: authAdminReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat([
			authAdminApi.middleware
		]),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
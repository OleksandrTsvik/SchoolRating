import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authAdminApi } from '../api/auth/admin/authAdminApi';
import authAdminReducer from '../api/auth/admin/authAdminSlice';
import authUserReducer from '../api/auth/user/authUserSlice';

export const store = configureStore({
	reducer: {
		[authAdminApi.reducerPath]: authAdminApi.reducer,
		authAdmin: authAdminReducer,
		authUser: authUserReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat(
			authAdminApi.middleware
		),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApi } from '@/features/auth/api/authApi';
import { productsApi } from '@/entities/product';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([authApi.middleware, productsApi.middleware]),
});

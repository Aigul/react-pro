import { combineReducers } from 'redux';
import { userSlice } from '@/entities/user';
import { cartSlice } from '@/entities/cart';
import { productsSlice } from '@/features/products';
import { authApi } from '@/features/auth/api/authApi';
import { productsApi } from '@/entities/product';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});

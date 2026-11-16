import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
	products: CartProduct[];
}

const createInitState = (): CartState => ({
	products: [],
});

const selectCartProducts = (state: CartState) => state.products;

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitState(),
	reducers: {
		addCartProduct(state, action: PayloadAction<CartProduct>) {
			state.products = [...state.products, action.payload];
		},
		deleteCartProduct(state, action: PayloadAction<CartProduct['id']>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setCartProductCount(
			state,
			action: PayloadAction<Pick<CartProduct, 'id' | 'count'>>
		) {
			state.products = state.products.map((p) =>
				p.id === action.payload.id ? { ...p, count: action.payload.count } : p
			);
		},
	},
	selectors: {
		getCartProducts: (state: CartState) => state.products,
		selectCartProductById: (state: CartState, id: string) =>
			state.products.find((p) => p.id === id),
		selectIsInCart: (state: CartState, id: string) =>
			state.products.some((p) => p.id === id),
		selectCartTotals: createSelector([selectCartProducts], (products) =>
			products.reduce(
				(acc, product) => {
					acc.price += product.price * product.count;
					acc.discount += product.discount * product.count;
					return acc;
				},
				{ price: 0, discount: 0 }
			)
		),
	},
});

export const cartActions = { ...cartSlice.actions };
export const cartSelectors = cartSlice.selectors;

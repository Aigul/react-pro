import { useCallback } from 'react';
import { cartActions } from '@/entities/cart';
import { useAppDispatch } from '@/shared/lib/redux/hooks';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();

	const addProductToCart = useCallback(
		(cartProduct: CartProduct) => {
			dispatch(cartActions.addCartProduct(cartProduct));
		},
		[dispatch]
	);

	return { addProductToCart };
};

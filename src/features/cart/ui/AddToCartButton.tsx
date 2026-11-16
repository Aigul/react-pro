import classNames from 'classnames';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { cartSelectors } from '@/entities/cart';
import { useAddToCart } from '../model/useAddToCart';
import { CartCounter } from './CartCounter';
import s from './AddToCartButton.module.css';

type AddToCartButtonProps = {
	product: Product;
};

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
	const isInCart = useAppSelector((state) =>
		cartSelectors.selectIsInCart(state, product.id)
	);
	const { addProductToCart } = useAddToCart();

	if (isInCart) {
		return <CartCounter productId={product.id} />;
	}

	return (
		<button
			type='button'
			onClick={() => addProductToCart({ ...product, count: 1 })}
			className={classNames(s['btn'], s['btn_primary'])}>
			В корзину
		</button>
	);
};

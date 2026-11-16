import classNames from 'classnames';
import s from '@/features/cart/ui/CartPage.module.css';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { cartSelectors } from '@/entities/cart';
import { CartList, CartAmount } from '@/features/cart';

export const CartPage = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	if (!products.length) {
		return <h1 className='header-title'>Товаров нет в корзине</h1>;
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{products.length}</span> в корзине
				</div>
				<CartList />
				<CartAmount />
			</div>
		</div>
	);
};

import classNames from 'classnames';
import s from '../../CartPage.module.css';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { cartSelectors } from '@/entities/cart';
import { CartItem } from '../../CartItem';

export const CartList = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} />
			))}
		</div>
	);
};

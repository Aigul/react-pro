import { useState } from 'react';
import classNames from 'classnames';
import s from '../../CartPage.module.css';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { cartSelectors } from '@/entities/cart';
import { Modal } from '@/shared/ui/Modal';

export const CartAmount = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);
	const { price: allPrice, discount: allDiscount } = useAppSelector(
		cartSelectors.selectCartTotals
	);
	const [isCheckoutOpen, setCheckoutOpen] = useState(false);

	const handleSubmitCart = () => {
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
	};

	const handleConfirm = () => {
		handleSubmitCart();
		setCheckoutOpen(false);
	};

	return (
		<div className={classNames(s['cart-amount'])}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>
						{`${allPrice} ₽`}
					</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						Скидка
					</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>
					Общая стоимость
				</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<button
				onClick={() => setCheckoutOpen(true)}
				className={classNames(
					s['button'],
					s['button_type_primary'],
					s['button_type_wide']
				)}>
				Оформить заказ
			</button>

			<Modal isOpen={isCheckoutOpen} onClose={() => setCheckoutOpen(false)}>
				<h2 className={classNames(s['cart-amount__title'])}>Оформление заказа</h2>
				<ul>
					{products.map((p) => (
						<li key={p.id}>
							{p.name} × {p.count}
						</li>
					))}
				</ul>
				<p>
					Итого: <b>{`${allPrice - allDiscount} ₽`}</b>
				</p>
				<button
					type='button'
					onClick={handleConfirm}
					className={classNames(s['button'], s['button_type_primary'])}>
					Подтвердить заказ
				</button>
			</Modal>
		</div>
	);
};

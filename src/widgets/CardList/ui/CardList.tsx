import { useProducts } from '@/features/products';
import { QueryState } from '@/shared/ui/QueryState';
import { ProductCard } from '../../ProductCard';
import s from './CardList.module.css';

type CardListProps = {
	title: string;
	onlyFavorites?: boolean;
};

export const CardList = ({ title, onlyFavorites = false }: CardListProps) => {
	const { products, isLoading, isError, error, refetch } = useProducts({
		onlyFavorites,
	});

	return (
		<div className={s['card-list']}>
			<div className={s['card-list__header']}>
				<h2 className={s['card-list__title']}>{title}</h2>
			</div>
			<QueryState
				isLoading={isLoading}
				isError={isError}
				error={error}
				onRetry={refetch}
			>
				{products.length === 0 ? (
					<h1 className='header-title'>Товар не найден</h1>
				) : (
					<div className={s['card-list__items']}>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</QueryState>
		</div>
	);
};

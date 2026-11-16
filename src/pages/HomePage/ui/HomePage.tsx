import { Sort, LoadMore } from '@/features/products';
import { CardList } from '@/widgets/CardList';

export const HomePage = () => {
	return (
		<>
			<Sort />
			<CardList title='Лакомства' />
			<LoadMore />
		</>
	);
};

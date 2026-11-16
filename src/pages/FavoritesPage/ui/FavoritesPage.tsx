import { ButtonBack } from '@/shared/ui/ButtonBack';
import { CardList } from '@/widgets/CardList';

export const FavoritesPage = () => {
	return (
		<>
			<br />
			<ButtonBack />
			<CardList title='Избранные' onlyFavorites />
		</>
	);
};

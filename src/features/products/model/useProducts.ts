import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks';
import { userSelectors } from '@/entities/user';
import { isLiked } from '@/entities/product';
import { useGetProductsQuery } from '@/entities/product';
import { productsActions, productsSelectors } from './products';
import { usePrevious } from '@/shared/hooks/usePrevious';

type UseProductsParams = {
	onlyFavorites?: boolean;
};

export const useProducts = ({ onlyFavorites = false }: UseProductsParams = {}) => {
	const dispatch = useAppDispatch();
	const { searchText, page, perPage, sort } = useAppSelector(
		productsSelectors.getProductsState
	);
	const user = useAppSelector(userSelectors.getUser);

	// useRef внутри usePrevious хранит прошлые значения без перерендера.
	// Когда поиск или сортировка меняются — сбрасываем страницу на первую.
	const previousSearchText = usePrevious(searchText);
	const previousSort = usePrevious(sort);

	useEffect(() => {
		const searchChanged =
			previousSearchText !== undefined && previousSearchText !== searchText;
		const sortChanged =
			previousSort !== undefined && previousSort !== sort;

		if ((searchChanged || sortChanged) && page !== 1) {
			dispatch(productsActions.setPage(1));
		}
	}, [searchText, sort, previousSearchText, previousSort, page, dispatch]);

	const { isLoading, isError, error, data, isFetching, refetch } =
		useGetProductsQuery({
			searchText,
			sort,
			page,
			perPage: onlyFavorites ? undefined : perPage,
		});

	const products = useMemo(() => {
		const list = data?.products ?? [];
		return onlyFavorites
			? list.filter((product) => isLiked(product.likes, user?.id))
			: list;
	}, [data?.products, onlyFavorites, user?.id]);

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		refetch,
		productsCount: data?.length ?? 0,
	};
};

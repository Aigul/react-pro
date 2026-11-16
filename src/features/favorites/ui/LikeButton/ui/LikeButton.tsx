import { startTransition, useOptimistic } from 'react';
import s from './LikeButton.module.css';
import LikeSvg from '@/shared/assets/icons/like.svg?react';
import classNames from 'classnames';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { userSelectors } from '@/entities/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} from '@/entities/product';
import { toast } from 'react-toastify';
import { getMessageFromError } from '@/shared/utils';

type TLikeButtonProps = {
	product: Product;
};

export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLiked = product.likes.some((l) => l.userId === user?.id);

	// useOptimistic (React 19): показываем лайк сразу, не дожидаясь ответа сервера.
	const [optimisticLiked, setOptimisticLiked] = useOptimistic(
		isLiked,
		(_current, next: boolean) => next
	);

	const toggleLike = () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		const next = !isLiked;

		// React 19 Action: async-transition держит оптимистичное состояние,
		// пока выполняется запрос, поэтому сердечко не откатывается до ответа.
		startTransition(async () => {
			setOptimisticLiked(next);

			try {
				const mutation = next ? setLike : deleteLike;
				await mutation({ id: product.id }).unwrap();
				// Успех: RTK Query инвалидирует тег и перезапрашивает список,
				// поэтому isLiked обновится и useOptimistic синхронизируется с сервером.
			} catch (error) {
				// Ошибка: откатываем оптимистичное состояние и показываем toast.
				setOptimisticLiked(isLiked);
				toast.error(getMessageFromError(error, 'Не удалось изменить избранное'));
			}
		});
	};

	return (
		<button
			type='button'
			aria-pressed={optimisticLiked}
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticLiked,
			})}
			onClick={toggleLike}
		>
			<LikeSvg />
		</button>
	);
};

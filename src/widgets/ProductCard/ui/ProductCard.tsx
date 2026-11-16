import { memo } from 'react';
import { Card } from '@/entities/product';
import { LikeButton } from '@/features/favorites';
import { AddToCartButton } from '@/features/cart';

type ProductCardProps = {
	product: Product;
};

export const ProductCard = memo(({ product }: ProductCardProps) => {
	return (
		<Card
			product={product}
			favoriteSlot={<LikeButton product={product} />}
			cartSlot={<AddToCartButton product={product} />}
		/>
	);
});

ProductCard.displayName = 'ProductCard';

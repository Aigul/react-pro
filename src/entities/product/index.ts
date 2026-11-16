export { Card } from './ui/Card';
export { isLiked } from './lib/isLiked';
export {
	productsApi,
	useGetProductQuery,
	useGetProductsQuery,
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} from './api/productsApi';
export type { IErrorResponse } from './api/productsApi';

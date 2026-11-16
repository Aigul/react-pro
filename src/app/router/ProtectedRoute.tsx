import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/redux/hooks';
import { userSelectors } from '@/entities/user';

export const ProtectedRoute = () => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const location = useLocation();

	if (!accessToken) {
		return (
			<Navigate
				to='/signin'
				replace
				state={{ from: location.pathname }}
			/>
		);
	}

	return <Outlet />;
};

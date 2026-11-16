import { ReactNode } from 'react';
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	CircularProgress,
	Container,
} from '@mui/material';
import { getMessageFromError } from '@/shared/utils';

type QueryStateProps = {
	isLoading: boolean;
	isError: boolean;
	error?: unknown;
	onRetry?: () => void;
	children: ReactNode;
};

export const QueryState = ({
	isLoading,
	isError,
	error,
	onRetry,
	children,
}: QueryStateProps) => {
	if (isError) {
		return (
			<Container>
				<Alert
					action={onRetry ? <Button onClick={onRetry}>Retry</Button> : undefined}
					severity='error'
				>
					<AlertTitle>
						{getMessageFromError(
							error,
							'Неизвестная ошибка при получении данных'
						)}
					</AlertTitle>
				</Alert>
			</Container>
		);
	}

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	return <>{children}</>;
};

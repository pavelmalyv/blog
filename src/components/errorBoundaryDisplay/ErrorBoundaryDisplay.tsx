import ErrorMessage from '@components/UI/errorMessage/ErrorMessage';
import { throwNotFoundIfStatus } from '@/utils/error';

interface ErrorBoundaryDisplayProps {
	isError: boolean;
	errorMessage: string;
	children: React.ReactNode;
	error?: unknown;
	isThrowNotFound?: boolean;
}

const ErrorBoundaryDisplay = ({
	isError,
	errorMessage,
	children,
	error,
	isThrowNotFound,
}: ErrorBoundaryDisplayProps) => {
	if (isThrowNotFound) {
		throwNotFoundIfStatus(error);
	}

	return <>{isError ? <ErrorMessage message={errorMessage} /> : <>{children}</>}</>;
};

export default ErrorBoundaryDisplay;

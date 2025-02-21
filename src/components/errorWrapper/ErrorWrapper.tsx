import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import { throwNotFoundIfStatus } from '../../utils/error';

interface ErrorWrapperProps {
	isError: boolean;
	errorMessage: string;
	children: React.ReactNode;
	error?: unknown;
	isThrowNotFound?: boolean;
}

const ErrorWrapper = ({
	isError,
	errorMessage,
	children,
	error,
	isThrowNotFound,
}: ErrorWrapperProps) => {
	if (isThrowNotFound) {
		throwNotFoundIfStatus(error);
	}

	return <>{isError ? <ErrorMessage message={errorMessage} /> : <>{children}</>}</>;
};

export default ErrorWrapper;

import Root from '@/pages/Root';
import ErrorScreen from '@/components/errorScreen/ErrorScreen';

import { isRouteErrorResponse, useRouteError } from 'react-router';
import { NotFoundError } from '@/utils/error';
import { useTitle } from '@hooks/useTitle';

const DESCRIPTION_NOT_FOUND =
	'The page you are looking for does not exist or has been moved. Check the URL or return to the homepage';

const getErrorInfo = (error: unknown) => {
	if (isRouteErrorResponse(error)) {
		const title = String(error.status);
		const isLink = true;

		switch (error.status) {
			case 404:
				return { title, description: DESCRIPTION_NOT_FOUND, isLink };
			default:
				return { title, description: 'Please try again later', isLink };
		}
	}

	if (error instanceof NotFoundError) {
		return { title: '404', description: DESCRIPTION_NOT_FOUND, isLink: true };
	}

	return {
		title: 'Error',
		description: 'A critical error has occurred. Try refreshing the page',
		isLink: false,
	};
};

const ErrorPage = () => {
	const error = useRouteError();
	const { title, description, isLink } = getErrorInfo(error);

	useTitle(title);

	return (
		<Root>
			<ErrorScreen title={title} description={description} isLink={isLink} />
		</Root>
	);
};
export default ErrorPage;

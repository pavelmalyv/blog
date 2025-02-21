import Root from '@/pages/Root';
import Error from '@components/error/Error';

import { isRouteErrorResponse, useRouteError } from 'react-router';

const ErrorPage = () => {
	const error = useRouteError();

	let title: string;
	let description: string;
	let isLink: boolean = false;

	if (isRouteErrorResponse(error)) {
		title = String(error.status);

		switch (error.status) {
			case 404:
				description =
					'The page you are looking for does not exist or has been moved. Check the URL or return to the homepage';
				isLink = true;
				break;
			default:
				description = 'Please try again later';
		}
	} else {
		title = 'Error';
		description = 'A critical error has occurred. Try refreshing the page';
	}

	return (
		<Root>
			<Error title={title} description={description} isLink={isLink} />
		</Root>
	);
};
export default ErrorPage;

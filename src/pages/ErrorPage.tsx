import Root from './Root';
import Error from '../components/error/Error';

import { useRouteError } from 'react-router';

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);

	return (
		<Root>
			<Error
				title="404"
				description="The page you are looking for does not exist or has been moved. Check the URL or return to the homepage"
			/>
		</Root>
	);
};

export default ErrorPage;

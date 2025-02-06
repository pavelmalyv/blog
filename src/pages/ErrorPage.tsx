import { useRouteError } from 'react-router';
import Root from './Root';

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);

	return (
		<Root>
			<div>ErrorPage</div>
		</Root>
	);
};

export default ErrorPage;

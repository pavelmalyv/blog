import Root from './Root';
import { useRouteError } from 'react-router';

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

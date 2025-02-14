import Root from '../pages/Root';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';

import { blogUrl } from './routes';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: blogUrl.base,
				element: <Home />,
			},
			{
				path: blogUrl.pagination(':pagination'),
				element: <Home />,
			},
		],
	},
]);

export default router;

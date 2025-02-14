import Root from '../pages/Root';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Post from '../pages/Post';

import { blogUrl } from './routes';
import { createBrowserRouter } from 'react-router';
import Post from '../pages/Post';

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
			{
				path: blogUrl.post(':id'),
				element: <Post />,
			},
		],
	},
]);

export default router;

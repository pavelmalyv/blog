import { blogUrl, policyUrl } from './routes';
import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Root = lazy(() => import('../pages/Root'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const Post = lazy(() => import('../pages/Post'));
const Policy = lazy(() => import('../pages/Policy'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense>
				<Root />
			</Suspense>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: blogUrl.base,
				element: (
					<Suspense>
						<Home />
					</Suspense>
				),
			},
			{
				path: blogUrl.pagination(':pagination'),
				element: (
					<Suspense>
						<Home />
					</Suspense>
				),
			},
			{
				path: blogUrl.post(':id'),
				element: (
					<Suspense>
						<Post />
					</Suspense>
				),
			},
			{
				path: policyUrl,
				element: (
					<Suspense>
						<Policy />
					</Suspense>
				),
			},
		],
	},
]);

export default router;

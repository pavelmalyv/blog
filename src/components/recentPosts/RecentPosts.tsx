import type { Posts } from '@/types/posts';

import PostsList from '@components/postsList/PostsList';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorBoundaryDisplay from '@components/errorBoundaryDisplay/ErrorBoundaryDisplay';

import { useGetPostsQuery } from '@/api/postsSlice';
import { ERROR_MESSAGES } from '@/constants/error';
import { MESSAGES } from '@/constants/messages';

interface RecentPostsProps {
	limit: number;
	excludeId?: string;
	stretchLast?: boolean;
	direction?: 'vertical' | 'horizontal';
}

const RecentPosts = ({
	limit,
	excludeId,
	stretchLast,
	direction = 'horizontal',
}: RecentPostsProps) => {
	const limitQuery = excludeId ? limit + 1 : limit;

	const { data, isLoading, isError } = useGetPostsQuery(
		{
			limit: limitQuery,
			sortBy: 'id',
			order: 'desc',
		},
		{
			selectFromResult: (result) => {
				if (result.data?.posts && excludeId) {
					if (!excludeId) {
						return result;
					}

					const postsFiltered = result.data.posts
						.filter((post) => post.id !== excludeId)
						.slice(0, limit);

					return {
						...result,
						data: {
							...result.data,
							posts: postsFiltered,
						},
					};
				}
				return result;
			},
		},
	);

	let posts: Posts | null[] = new Array(limit).fill(null);

	if (!isLoading && data) {
		posts = data.posts;
	}

	return (
		<VisuallyHiddenLoader isFetching={isLoading} hiddenMessage={MESSAGES.postsLoading}>
			<ErrorBoundaryDisplay isError={isError} errorMessage={ERROR_MESSAGES.postsLoad}>
				<PostsList posts={posts} direction={direction} stretchLast={stretchLast} />
			</ErrorBoundaryDisplay>
		</VisuallyHiddenLoader>
	);
};

export default RecentPosts;

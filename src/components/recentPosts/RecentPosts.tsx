import type { Posts } from '../../types/posts';

import PostsList from '../postsList/PostsList';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';

import { useGetPostsQuery } from '../../api/postsSlice';
import { ERROR_MESSAGES } from '../../constants/error';
import { MESSAGES } from '../../constants/messages';

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

	const { data, isLoading, isFetching, isError } = useGetPostsQuery(
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
	const isBusy = isLoading || isFetching;

	if (!isLoading && data) {
		posts = data.posts;
	}

	return (
		<div aria-busy={isBusy}>
			<HiddenLoadingMessage isLoading={isBusy} message={MESSAGES.postsLoading} />

			{isError ? (
				<ErrorMessage message={ERROR_MESSAGES.postsLoad} />
			) : (
				<PostsList posts={posts} direction={direction} stretchLast={stretchLast} />
			)}
		</div>
	);
};

export default RecentPosts;

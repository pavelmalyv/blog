import type { Posts } from '../../types/posts';

import cl from './RecentPosts.module.scss';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import PostCard from '../postCard/PostCard';

import { useGetPostsQuery } from '../../api/postsSlice';
import { ERROR_MESSAGES } from '../../constants/error';
import { MESSAGES } from '../../constants/messages';

interface RecentPostsProps {
	limit: number;
	excludeId?: string;
}

const RecentPosts = ({ limit, excludeId }: RecentPostsProps) => {
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

	let body: React.ReactNode;
	let posts: Posts | null[] = new Array(limit).fill(null);
	const isBusy = isLoading || isFetching;

	if (!isLoading && data) {
		posts = data.posts;
	}

	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postsLoad} />;
	} else {
		body = (
			<ul className={cl.list}>
				{posts.map((post, index) => {
					const key = post ? post.id : index;

					return (
						<li key={key}>
							<PostCard post={post} />
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<div aria-busy={isBusy}>
			<HiddenLoadingMessage isLoading={isBusy} message={MESSAGES.postsLoading} />

			{body}
		</div>
	);
};

export default RecentPosts;

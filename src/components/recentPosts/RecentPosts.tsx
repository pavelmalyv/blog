import type { Posts } from '../../types/posts';

import cl from './RecentPosts.module.scss';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import PostCard from '../postCard/PostCard';

import { useGetPostsQuery } from '../../api/postsSlice';
import { ERROR_MESSAGES } from '../../constants/error';
import { MESSAGES } from '../../constants/messages';

const LIMIT = 5;

const RecentPosts = () => {
	const { data, isLoading, isFetching, isError } = useGetPostsQuery({ limit: LIMIT });

	let body: React.ReactNode;
	let posts: Posts | null[] = new Array(LIMIT).fill(null);
	const isBusy = isLoading || isFetching;

	if (!isLoading && data) {
		posts = data.posts;
	}

	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postsLoad} />;
	} else {
		body = (
			<ul className={cl.list}>
				{posts.map((post) => (
					<li>
						<PostCard post={post} />
					</li>
				))}
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

import type { Post } from '../types/posts';

import Article from '../components/article/Article';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../components/UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Sidebar from '../components/sidebar/Sidebar';
import RecentPosts from '../components/recentPosts/RecentPosts';

import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '../api/postsSlice';
import { ERROR_MESSAGES } from '../constants/error';
import { MESSAGES } from '../constants/messages';

const Post = () => {
	const params = useParams<{ id?: string }>();
	if (!params.id) {
		throw new Response('Not Found', { status: 404 });
	}

	const { data, isLoading, isFetching, isError } = useGetPostByIdQuery(params.id);
	const isBusy = isLoading || isFetching;

	let articleBody: React.ReactNode;

	if (isError) {
		articleBody = <ErrorMessage message={ERROR_MESSAGES.postLoad} />;
	} else {
		articleBody = <Article post={data ?? null} />;
	}

	return (
		<Sidebar reverse={true}>
			<div aria-busy={isBusy}>
				<HiddenLoadingMessage isLoading={isBusy} message={MESSAGES.postLoading} />
				{articleBody}
			</div>

			<Sidebar.Aside title="Recent blog posts">
				<RecentPosts />
			</Sidebar.Aside>
		</Sidebar>
	);
};

export default Post;

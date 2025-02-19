import type { Post } from '../types/posts';

import Article from '../components/article/Article';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../components/UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Sidebar from '../components/sidebar/Sidebar';
import RecentPosts from '../components/recentPosts/RecentPosts';
import Newsletters from '../components/newsletters/Newsletters';

import { throwNotFoundIfInvalid, throwNotFoundIfStatus } from '../utils/error';
import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '../api/postsSlice';
import { ERROR_MESSAGES } from '../constants/error';
import { MESSAGES } from '../constants/messages';

const Post = () => {
	const params = useParams<{ id?: string }>();
	const idPost = throwNotFoundIfInvalid(params.id);

	const { data, isLoading, isFetching, isError, error } = useGetPostByIdQuery(idPost);

	throwNotFoundIfStatus(error);

	const isBusy = isLoading || isFetching;

	let articleBody: React.ReactNode;

	if (isError) {
		articleBody = <ErrorMessage message={ERROR_MESSAGES.postLoad} />;
	} else {
		articleBody = <Article post={data ?? null} />;
	}

	return (
		<Sidebar reverse={true}>
			<Sidebar.Main>
				<div aria-busy={isBusy}>
					<HiddenLoadingMessage isLoading={isBusy} message={MESSAGES.postLoading} />
					{articleBody}
				</div>

				<Newsletters />
			</Sidebar.Main>

			<Sidebar.Aside title="Recent blog posts">
				<RecentPosts limit={5} excludeId={idPost} direction="vertical" />
			</Sidebar.Aside>
		</Sidebar>
	);
};

export default Post;

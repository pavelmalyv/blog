import type { Post } from '../types/posts';

import Article from '../components/article/Article';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../components/UI/hiddenLoadingMessage/HiddenLoadingMessage';

import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '../api/postsSlice';
import { ERROR_MESSAGES } from '../constants/error';
import { MESSAGES } from '../constants/messages';
import Sidebar from '../components/sidebar/Sidebar';

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
		<div className="container">
			<div aria-busy={isBusy}>
				<HiddenLoadingMessage isLoading={isBusy} message={MESSAGES.postLoading} />

				<Sidebar reverse={true}>
					{articleBody}

					<Sidebar.Aside title="Recent blog posts">{null}</Sidebar.Aside>
				</Sidebar>
			</div>
		</div>
	);
};

export default Post;

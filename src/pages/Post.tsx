import type { Post } from '../types/posts';

import Article from '../components/article/Article';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../components/UI/hiddenLoadingMessage/HiddenLoadingMessage';

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

	let body: React.ReactNode;

	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postLoad} />;
	} else {
		body = <Article post={data ?? null} />;
	}

	return (
		<div className="container">
			<div aria-busy={isBusy}>
				<HiddenLoadingMessage isLoading={isBusy} message={MESSAGES.postLoading} />

				{body}
			</div>
		</div>
	);
};

export default Post;

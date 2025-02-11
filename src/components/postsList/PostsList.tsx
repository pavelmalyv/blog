import type { Posts } from '../../types/posts';
import { useGetPostsQuery } from '../../api/postsSlice';
import PostCard from '../postCard/PostCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Section from '../UI/section/Section';
import cl from './PostsList.module.scss';
import { ERROR_MESSAGES } from '../../constants/error';
import { useParams } from 'react-router';
import { useValidatePaginationParam } from '../../hooks/useValidatePaginationParam';
import { blogUrl } from '../../routes/routes';
import useValidatePaginationTotal from '../../hooks/useValidatePaginationTotal';

const PostsList = () => {
	const params = useParams<{ pagination?: string }>();
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		blogUrl.base,
	);

	const limit = 9;
	let total: number | undefined;
	let posts: Posts | null[] = Array(limit).fill(null);

	const { data, isLoading, isError } = useGetPostsQuery(
		{ limit, skip: 0 },
		{ skip: !isValidPaginationParam },
	);

	if (!isLoading && data) {
		posts = data.posts;
		total = data.total;
	}

	const paginationPage = useValidatePaginationTotal({
		limit,
		total,
		currentPage: paginationParam,
		createPaginationUrl: blogUrl.pagination,
	});

	let body: React.ReactNode;
	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postsLoad} />;
	} else {
		body = (
			<>
				<HiddenLoadingMessage isLoading={isLoading} />

				<ul className={cl.list}>
					{posts.map((post, i) => {
						const key = post ? post.id : i;

						return (
							<li className={cl.item} key={key}>
								<PostCard post={post} />
							</li>
						);
					})}
				</ul>
			</>
		);
	}

	return (
		<Section title="All blog posts">
			<div aria-busy={isLoading}>{body}</div>
		</Section>
	);
};

export default PostsList;

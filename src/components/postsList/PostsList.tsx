import type { Posts } from '../../types/posts';
import { useGetPostsQuery } from '../../api/postsSlice';
import PostCard from '../postCard/PostCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Section from '../UI/section/Section';
import cl from './PostsList.module.scss';
import { ERROR_MESSAGES } from '../../constants/error';
import Pagination from '../UI/pagination/Pagination';
import { useParams } from 'react-router';
import { useValidatePaginationParam } from '../../hooks/useValidatePaginationParam';
import { blogUrl } from '../../routes/routes';
import useValidatePaginationTotal from '../../hooks/useValidatePaginationTotal';
import Filter from '../filter/Filter';
import Search from '../Forms/search/Search';

const PostsList = () => {
	const params = useParams<{ pagination?: string }>();
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		blogUrl.base,
	);

	const limit = 9;
	let total: number | undefined;
	let posts: Posts | null[] = Array(limit).fill(null);
	const skip = paginationParam ? (paginationParam - 1) * limit : 0;

	const { data, isLoading, isFetching, isError } = useGetPostsQuery(
		{ limit, skip },
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

				<Filter>
					<Filter.Item>
						<Search title="Blog search" />
					</Filter.Item>
				</Filter>

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

				{total && paginationPage && (
					<Pagination
						limit={limit}
						total={total}
						currentPage={paginationPage}
						urlBase={blogUrl.base}
						createUrl={blogUrl.pagination}
						isLoading={isFetching}
					/>
				)}
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

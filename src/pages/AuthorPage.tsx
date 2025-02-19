import type { Posts } from '../types/posts';

import Heading from '../components/UI/heading/Heading';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import User from '../components/user/User';
import Section from '../components/UI/section/Section';
import HiddenLoadingMessage from '../components/UI/hiddenLoadingMessage/HiddenLoadingMessage';
import PostsList from '../components/postsList/PostsList';
import Pagination from '../components/UI/pagination/Pagination';

import { useParams } from 'react-router';
import { useGetUserByIdQuery } from '../api/usersSlice';
import { throwNotFoundIfInvalid, throwNotFoundIfStatus } from '../utils/error';
import { authorUrl } from '../routes/routes';
import { useValidatePaginationParam } from '../hooks/useValidatePaginationParam';
import { useGetPostByIdUserQuery } from '../api/postsSlice';
import { useValidatePaginationTotal } from '../hooks/useValidatePaginationTotal';
import { getSkip } from '../utils/pagination';

import { ERROR_MESSAGES } from '../constants/error';
import { MESSAGES } from '../constants/messages';

const LIMIT_POSTS = 6;

const AuthorPage = () => {
	const params = useParams<{ id?: string; pagination?: string }>();
	const authorId = throwNotFoundIfInvalid(params.id);
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		authorUrl.profile(authorId),
	);

	const { data: user, isError, error } = useGetUserByIdQuery(authorId);
	if (isError) {
		throwNotFoundIfStatus(error);
	}

	let totalPosts: number | undefined;
	const skipPosts = getSkip(paginationParam, LIMIT_POSTS);
	let posts: Posts | null[] = Array(LIMIT_POSTS).fill(null);

	const {
		data: dataPosts,
		isLoading: isLoadingPosts,
		isError: isErrorPosts,
		isFetching: isFetchingAuthor,
	} = useGetPostByIdUserQuery(
		{ id: authorId, limit: LIMIT_POSTS, skip: skipPosts },
		{ skip: !isValidPaginationParam },
	);

	if (dataPosts) {
		posts = dataPosts.posts;
		totalPosts = dataPosts.total;
	}

	const paginationPage = useValidatePaginationTotal({
		limit: LIMIT_POSTS,
		total: totalPosts,
		currentPage: paginationParam,
		paginationUrlCallback: (page) => authorUrl.pagination(authorId, page),
	});

	return (
		<>
			{isError ? (
				<Section>
					<ErrorMessage message={ERROR_MESSAGES.authorLoad} />
				</Section>
			) : (
				<>
					<Heading title={user ? `${user.firstName} ${user.lastName}` : null} />
					<User user={user ?? null} />
				</>
			)}

			<Section title="All articles by the author">
				<div aria-busy={isLoadingPosts}>
					<HiddenLoadingMessage isLoading={isLoadingPosts} message={MESSAGES.authorPostsLoading} />

					{isErrorPosts ? (
						<ErrorMessage message={ERROR_MESSAGES.authorPostLoad} />
					) : (
						<>
							<PostsList posts={posts} />

							{totalPosts && paginationPage ? (
								<Pagination
									limit={LIMIT_POSTS}
									total={totalPosts}
									currentPage={paginationPage}
									urlBase={authorUrl.profile(authorId)}
									isLoading={isFetchingAuthor}
									urlCallback={(page) => authorUrl.pagination(authorId, page)}
								/>
							) : null}
						</>
					)}
				</div>
			</Section>
		</>
	);
};

export default AuthorPage;

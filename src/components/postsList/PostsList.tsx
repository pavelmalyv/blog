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
import { useValidatePaginationTotal } from '../../hooks/useValidatePaginationTotal';
import Filter from '../filter/Filter';
import Search from '../Forms/search/Search';
import { useId } from 'react';
import Field from '../UI/field/Field';
import { useDelayAnimationLoading } from '../../hooks/useDelayAnimationLoading';
import Message from '../UI/message/Message';
import { MESSAGES } from '../../constants/messages';
import classNames from 'classnames';
import Select from '../UI/select/Select';
import { useSearch } from '../../hooks/useSearch';
import { useSortBy } from '../../hooks/useSortBy';
import { useLimit } from '../../hooks/useLimit';

const SEARCH_MAX_LENGTH = 30;
const VALUES_SORT = ['id|desc', 'id|asc', 'views|desc'];
const VALUES_LIMIT = [9, 18, 36];

const PostsList = () => {
	const params = useParams<{ pagination?: string }>();
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		blogUrl.base,
	);

	let isLoading = false;
	let isFetching = false;

	const { searchDebounced, lastQuerySearch, searchField, isLoadingDelaySearch, handleSearch } =
		useSearch(isLoading, isFetching, SEARCH_MAX_LENGTH);
	const { sortBy, order, sortSelectValue, handleChangeSort } = useSortBy(VALUES_SORT);
	const { limit, handleChangeLimit } = useLimit(VALUES_LIMIT);

	let total: number | undefined;
	let posts: Posts | null[] = Array(limit).fill(null);
	const skip = paginationParam ? (paginationParam - 1) * limit : 0;

	const {
		data,
		isLoading: isLoadingQuery,
		isFetching: isFetchingQuery,
		isError,
	} = useGetPostsQuery(
		{ limit, skip, search: searchDebounced, sortBy, order },
		{ skip: !isValidPaginationParam },
	);

	isLoading = isLoadingQuery;
	isFetching = isFetchingQuery;
	const isFetchingDelayPosts = useDelayAnimationLoading(isFetching);

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
	} else if (total === 0 && lastQuerySearch) {
		body = <Message message={MESSAGES.postsNotFound(lastQuerySearch)} />;
	} else if (total === 0) {
		body = <Message message={MESSAGES.postsEmpty} />;
	} else {
		body = (
			<>
				{searchField.length > 0 && lastQuerySearch && total && (
					<div className={classNames(cl['search-result'], 'h4')}>
						{MESSAGES.postsFound(lastQuerySearch, total)}
					</div>
				)}

				<div
					className={classNames(cl.posts, {
						[cl['posts_is-animation-posts']]: isFetchingDelayPosts,
					})}
				>
					{isFetching && <div className={cl.overlay}></div>}

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
				</div>

				{total && paginationPage ? (
					<Pagination
						limit={limit}
						total={total}
						currentPage={paginationPage}
						urlBase={blogUrl.base}
						createUrl={blogUrl.pagination}
						isLoading={isFetching}
					/>
				) : null}
			</>
		);
	}

	const idPosts = useId();

	return (
		<Section title="All blog posts">
			<Filter>
				<Search title="Blog search" onSubmit={(e) => e.preventDefault()}>
					<Field
						type="search"
						icon="search"
						name="search"
						value={searchField}
						label="Search posts"
						onChange={handleSearch}
						maxLength={SEARCH_MAX_LENGTH}
						isLoading={isLoadingDelaySearch}
						aria-controls={idPosts}
					/>
				</Search>

				<div className={cl['filter-select-group']}>
					<Select
						label="SortSelect by"
						value={sortSelectValue}
						onChange={handleChangeSort}
						aria-controls={idPosts}
					>
						<Select.Option value={VALUES_SORT[0]}>Newest to oldest</Select.Option>
						<Select.Option value={VALUES_SORT[1]}>Oldest to newest</Select.Option>
						<Select.Option value={VALUES_SORT[2]}>Most interesting</Select.Option>
					</Select>
					<Select
						label="Show by"
						value={String(limit)}
						onChange={handleChangeLimit}
						aria-controls={idPosts}
					>
						<Select.Option value={String(VALUES_LIMIT[0])}>{VALUES_LIMIT[0]}</Select.Option>
						<Select.Option value={String(VALUES_LIMIT[1])}>{VALUES_LIMIT[1]}</Select.Option>
						<Select.Option value={String(VALUES_LIMIT[2])}>{VALUES_LIMIT[2]}</Select.Option>
					</Select>
				</div>
			</Filter>

			<div id={idPosts} aria-busy={isLoading || isFetching}>
				<HiddenLoadingMessage isLoading={isLoading || isFetching} message={MESSAGES.postsLoading} />

				{body}
			</div>
		</Section>
	);
};

export default PostsList;

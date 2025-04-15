import type { Posts } from '@/types/posts';

import cl from './AllPosts.module.scss';
import Filter from '@components/filter/Filter';
import SearchForm from '@components/Forms/searchForm/SearchForm';
import Section from '@components/UI/section/Section';
import Select from '@components/UI/select/Select';
import Pagination from '@components/UI/pagination/Pagination';
import MessageInfo from '@/components/UI/messageInfo/MessageInfo';
import Field from '@components/UI/field/Field';
import PostsList from '@components/postsList/PostsList';
import SearchResult from '@components/UI/searchResult/SearchResult';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorBoundaryDisplay from '@components/errorBoundaryDisplay/ErrorBoundaryDisplay';

import { useId } from 'react';
import { useParams } from 'react-router';
import { useFetchingQuery } from '@hooks/useFetchingQuery';
import { formatSortOrder } from '@/utils/sort';
import { blogUrl } from '@/routes/routes';
import { useGetPostsQuery } from '@/api/postsSlice';
import { useValidatePaginationParam } from '@hooks/useValidatePaginationParam';
import { useValidatePaginationTotal } from '@hooks/useValidatePaginationTotal';
import { useSearch } from '@hooks/useSearch';
import { useSortBy } from '@hooks/useSortBy';
import { useLimit } from '@hooks/useLimit';
import { getSkip } from '@/utils/pagination';
import { MESSAGES } from '@/constants/messages';
import { ERROR_MESSAGES } from '@/constants/error';

const SEARCH_MAX_LENGTH = 30;
const VALUES_SORT = ['id|desc', 'id|asc', 'views|desc'];
const VALUES_LIMIT = [9, 18, 36];

const AllPosts = () => {
	const params = useParams<{ pagination?: string }>();
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		blogUrl.base,
	);

	const { searchDebounced, searchField, handleSearch } = useSearch(SEARCH_MAX_LENGTH);
	const { sortBy, order, sortSelectValue, handleChangeSort } = useSortBy(VALUES_SORT);
	const { limit, handleChangeLimit } = useLimit(VALUES_LIMIT);

	let total: number | undefined;
	let posts: Posts | null[] = Array(limit).fill(null);
	const skip = getSkip(paginationParam, limit);

	const { data, isLoading, isFetching, isError } = useGetPostsQuery(
		{ limit, skip, search: searchDebounced, sortBy, order },
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
		paginationUrlCallback: (page) => blogUrl.pagination(page),
	});

	const { isFetching: isFetchingPagination } = useFetchingQuery(paginationPage, isFetching);
	const { isFetching: isFetchingLimit } = useFetchingQuery(limit, isFetching);
	const { isFetching: isFetchingSort } = useFetchingQuery(
		formatSortOrder(sortBy, order ?? ''),
		isFetching,
	);
	const {
		isFetching: isFetchingSearch,
		isLoadingDelay: isFetchingDelaySearch,
		lastQuery: lastQuerySearch,
	} = useFetchingQuery(searchDebounced, isFetching);

	const idFetchingPosts =
		isFetchingPagination || isFetchingLimit || isFetchingSort || isFetchingSearch;

	const postsId = useId();

	return (
		<Section title="All blog posts">
			<Filter>
				<SearchForm title="Blog search" onSubmit={(e) => e.preventDefault()}>
					<Field
						type="search"
						icon="search"
						name="search"
						placeholder="Enter your query"
						value={searchField}
						label="Search posts"
						onChange={handleSearch}
						maxLength={SEARCH_MAX_LENGTH}
						isLoading={isFetchingDelaySearch}
						aria-controls={postsId}
					/>
				</SearchForm>

				<div className={cl['filter-select-group']}>
					<Select
						label="Sort by"
						value={sortSelectValue}
						onChange={handleChangeSort}
						aria-controls={postsId}
					>
						<Select.Option value={VALUES_SORT[0]}>Newest to oldest</Select.Option>
						<Select.Option value={VALUES_SORT[1]}>Oldest to newest</Select.Option>
						<Select.Option value={VALUES_SORT[2]}>Most interesting</Select.Option>
					</Select>
					<Select
						label="Show by"
						value={String(limit)}
						onChange={handleChangeLimit}
						aria-controls={postsId}
					>
						<Select.Option value={String(VALUES_LIMIT[0])}>{VALUES_LIMIT[0]}</Select.Option>
						<Select.Option value={String(VALUES_LIMIT[1])}>{VALUES_LIMIT[1]}</Select.Option>
						<Select.Option value={String(VALUES_LIMIT[2])}>{VALUES_LIMIT[2]}</Select.Option>
					</Select>
				</div>
			</Filter>

			<VisuallyHiddenLoader
				id={postsId}
				isFetching={idFetchingPosts}
				hiddenMessage={MESSAGES.postsLoading}
			>
				<ErrorBoundaryDisplay isError={isError} errorMessage={ERROR_MESSAGES.postsLoad}>
					<SearchResult field={searchField} lastQuery={lastQuerySearch} total={total} />

					<PostsList isFetching={idFetchingPosts}>
						{total === 0 && lastQuerySearch ? (
							<MessageInfo message={MESSAGES.postsNotFound(lastQuerySearch)} />
						) : (
							<PostsList.Posts posts={posts} stretchLast={true} />
						)}
					</PostsList>

					{paginationPage && total ? (
						<Pagination
							limit={limit}
							total={total}
							currentPage={paginationPage}
							urlBase={blogUrl.base}
							urlCallback={(page) => blogUrl.pagination(page)}
							isLoading={isFetchingPagination}
						/>
					) : null}
				</ErrorBoundaryDisplay>
			</VisuallyHiddenLoader>
		</Section>
	);
};

export default AllPosts;

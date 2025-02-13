import type { Posts } from '../../types/posts';
import { useGetPostsQuery } from '../../api/postsSlice';
import PostCard from '../postCard/PostCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Section from '../UI/section/Section';
import cl from './PostsList.module.scss';
import { ERROR_MESSAGES } from '../../constants/error';
import Pagination from '../UI/pagination/Pagination';
import { useParams, useSearchParams } from 'react-router';
import { useValidatePaginationParam } from '../../hooks/useValidatePaginationParam';
import { blogUrl } from '../../routes/routes';
import useValidatePaginationTotal from '../../hooks/useValidatePaginationTotal';
import Filter from '../filter/Filter';
import Search from '../Forms/search/Search';
import { useEffect, useId, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import Field from '../UI/field/Field';
import useDelayAnimationLoading from '../../hooks/useDelayAnimationLoading';
import Message from '../UI/message/Message';
import { MESSAGES } from '../../constants/messages';
import classNames from 'classnames';
import Select from '../UI/select/Select';
import { SORT_ORDER_VALUES } from '../../constants/api';

const SEARCH_MAX_LENGTH = 30;
const INIT_LIMIT = 9;
const INIT_SORT_SELECT = 'id|desc';

const PostsList = () => {
	const params = useParams<{ pagination?: string }>();
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		blogUrl.base,
	);

	const [searchParams, setSearchParams] = useSearchParams();
	const searchQ = searchParams.get('q')?.slice(0, SEARCH_MAX_LENGTH);
	const [searchField, setSearchField] = useState(searchQ ?? '');
	const [searchStateDebounced, setSearchStateDebounced] = useState(searchQ);
	const [lastQuerySearch, setLastQuerySearch] = useState<string | undefined>(undefined);
	const setSearchDebounced = useMemo(() => debounce(setSearchStateDebounced, 300), []);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setSearchParams((prev) => {
			if (value.length === 0) {
				prev.delete('q');
			} else {
				prev.set('q', value);
			}
			return prev;
		});

		setSearchField(value);
		setSearchDebounced(value);
	};

	const splitSortOrder = (sortParam: string) => {
		const paramsArray = sortParam.split('|');
		const sortBy = paramsArray[0];
		const order = paramsArray.length === 2 ? paramsArray[1] : undefined;
		return [sortBy, SORT_ORDER_VALUES.find((item) => item === order)] as const;
	};

	const [limit, setLimit] = useState(INIT_LIMIT);
	const [sortSelect, setSortSelect] = useState(INIT_SORT_SELECT);

	let total: number | undefined;
	let posts: Posts | null[] = Array(limit).fill(null);
	const skip = paginationParam ? (paginationParam - 1) * limit : 0;
	const [sortBy, order] = splitSortOrder(sortSelect);

	const { data, isLoading, isFetching, isError } = useGetPostsQuery(
		{ limit, skip, search: searchStateDebounced, sortBy, order },
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

	const isFetchingDelayPosts = useDelayAnimationLoading(isFetching);
	const isLoadingDelaySearch = useDelayAnimationLoading(
		(searchField.length > 0 || Boolean(lastQuerySearch)) && isFetching && !isLoading,
	);

	useEffect(() => {
		if (isFetching) {
			return;
		}

		setLastQuerySearch(searchStateDebounced);
	}, [isFetching, searchStateDebounced]);

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
						value={sortSelect}
						onChange={(e) => setSortSelect(e.target.value)}
					>
						<Select.Option value={INIT_SORT_SELECT}>Newest to oldest</Select.Option>
						<Select.Option value="id|asc">Oldest to newest</Select.Option>
						<Select.Option value="views|desc">Most interesting</Select.Option>
					</Select>
					<Select
						label="Show by"
						value={String(limit)}
						onChange={(e) => setLimit(Number(e.target.value))}
					>
						<Select.Option value={String(INIT_LIMIT)}>{INIT_LIMIT}</Select.Option>
						<Select.Option value="18">18</Select.Option>
						<Select.Option value="36">36</Select.Option>
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

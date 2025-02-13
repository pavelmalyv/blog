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

const SEARCH_MAX_LENGTH = 30;

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

	const limit = 9;
	let total: number | undefined;
	let posts: Posts | null[] = Array(limit).fill(null);
	const skip = paginationParam ? (paginationParam - 1) * limit : 0;

	const { data, isLoading, isFetching, isError } = useGetPostsQuery(
		{ limit, skip, search: searchStateDebounced },
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
				<Filter.Item>
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
				</Filter.Item>
				<Filter.Item>
					<Select label="Show by" size="small">
						<Select.Option>9</Select.Option>
						<Select.Option>18</Select.Option>
						<Select.Option>36</Select.Option>
					</Select>
				</Filter.Item>
			</Filter>

			<div id={idPosts} aria-busy={isLoading || isFetching}>
				<HiddenLoadingMessage isLoading={isLoading || isFetching} />

				{body}
			</div>
		</Section>
	);
};

export default PostsList;

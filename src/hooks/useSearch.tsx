import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDelayAnimationLoading } from './useDelayAnimationLoading';

const KEY_SEARCH = 'q';

export const useSearch = (isFetching: boolean, isLoading: boolean, maxLength: number) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchQ = searchParams.get(KEY_SEARCH)?.slice(0, maxLength);
	const [searchField, setSearchField] = useState(searchQ ?? '');
	const [searchStateDebounced, setSearchStateDebounced] = useState(searchQ);
	const [lastQuerySearch, setLastQuerySearch] = useState<string | undefined>(undefined);
	const setSearchDebounced = useMemo(() => debounce(setSearchStateDebounced, 300), []);
	const isLoadingDelaySearch = useDelayAnimationLoading(
		(searchField.length > 0 || Boolean(lastQuerySearch)) && isFetching && !isLoading,
	);

	useEffect(() => {
		return () => setSearchDebounced.cancel();
	}, [setSearchDebounced]);

	useEffect(() => {
		if (isFetching) {
			return;
		}

		setLastQuerySearch(searchStateDebounced);
	}, [isFetching, searchStateDebounced]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setSearchParams(
			(prev) => {
				if (value.length === 0) {
					prev.delete(KEY_SEARCH);
				} else {
					prev.set(KEY_SEARCH, value);
				}
				return prev;
			},
			{ replace: true },
		);

		setSearchField(value);
		setSearchDebounced(value);
	};

	return {
		searchDebounced: searchStateDebounced,
		lastQuerySearch,
		searchField,
		handleSearch,
		isLoadingDelaySearch,
	};
};

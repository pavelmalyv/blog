import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

const KEY_SEARCH = 'q';

export const useSearch = (maxLength: number) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchQ = searchParams.get(KEY_SEARCH)?.slice(0, maxLength);
	const [searchField, setSearchField] = useState(searchQ ?? '');
	const [searchStateDebounced, setSearchStateDebounced] = useState(searchQ);
	const setSearchDebounced = useMemo(() => debounce(setSearchStateDebounced, 300), []);

	useEffect(() => {
		return () => setSearchDebounced.cancel();
	}, [setSearchDebounced]);

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
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
		},
		[setSearchParams, setSearchDebounced],
	);

	return {
		searchDebounced: searchStateDebounced,
		searchField,
		handleSearch,
	};
};

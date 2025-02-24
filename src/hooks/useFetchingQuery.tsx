import { useEffect, useState } from 'react';
import { useDelayedLoader } from '@hooks/useDelayedLoader';

export const useFetchingQuery = <T extends string | number | boolean | undefined>(
	value: T,
	isFetching: boolean,
) => {
	const [lastQuery, setLastQuery] = useState<T | null>(null);

	useEffect(() => {
		if (isFetching) {
			return;
		}

		setLastQuery(value);
	}, [isFetching, value]);

	const valueLength = value ? String(value).length : 0;
	const lastQueryLength = lastQuery ? String(lastQuery).length : 0;
	const isFetchingQuery = lastQuery !== value && (valueLength > 0 || lastQueryLength > 0);
	const isLoadingDelay = useDelayedLoader(isFetchingQuery);

	return { isFetching: isFetchingQuery, isLoadingDelay, lastQuery };
};

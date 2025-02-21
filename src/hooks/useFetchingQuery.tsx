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

	const isFetchingQuery = lastQuery !== value;
	const isLoadingDelay = useDelayedLoader(isFetchingQuery);

	return { isFetching: isFetchingQuery, isLoadingDelay, lastQuery };
};

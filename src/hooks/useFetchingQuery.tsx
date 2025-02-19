import { useEffect, useState } from 'react';
import { useDelayAnimationLoading } from './useDelayAnimationLoading';

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
	const isLoadingDelay = useDelayAnimationLoading(isFetchingQuery);

	return { isFetching: isFetchingQuery, isLoadingDelay, lastQuery };
};

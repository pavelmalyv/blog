import { useEffect, useState } from 'react';

export const useLastQuery = <T extends string | number | boolean | undefined | null>(
	value: T,
	isFetching: boolean,
) => {
	const [lastQuery, setLastQuery] = useState<T | undefined>(undefined);

	useEffect(() => {
		if (isFetching) {
			return;
		}

		setLastQuery(value);
	}, [isFetching, value]);

	return lastQuery;
};

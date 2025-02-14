import { useEffect, useState } from 'react';
import { useDelayAnimationLoading } from './useDelayAnimationLoading';

export const useSearchLoading = (
	isFetching: boolean,
	isLoading: boolean,
	searchStateDebounced: string | undefined,
	searchField: string,
) => {
	const [lastQuerySearch, setLastQuerySearch] = useState<string | undefined>(undefined);
	const isLoadingDelaySearch = useDelayAnimationLoading(
		(searchField.length > 0 || Boolean(lastQuerySearch)) && isFetching && !isLoading,
	);

	useEffect(() => {
		if (isFetching) {
			return;
		}

		setLastQuerySearch(searchStateDebounced);
	}, [isFetching, searchStateDebounced]);

	return { lastQuerySearch, isLoadingDelaySearch };
};

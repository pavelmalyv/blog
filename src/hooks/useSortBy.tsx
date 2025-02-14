import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { SORT_ORDER_VALUES } from '../constants/api';

const KEY_SORT_BY = 'sortBy';
const KEY_ORDER = 'order';

export const useSortBy = (optionsValue: string[]) => {
	const [urlParams, setUrlParams] = useSearchParams();

	const splitSortOrder = (sortParam: string) => {
		const paramsArray = sortParam.split('|');
		const sortBy = paramsArray[0];
		const order = paramsArray.length === 2 ? paramsArray[1] : undefined;
		return [sortBy, SORT_ORDER_VALUES.find((item) => item === order)] as const;
	};

	const joinSortOrder = (sort: string, order: string) => `${sort}|${order}`;

	const param = joinSortOrder(urlParams.get(KEY_SORT_BY) ?? '', urlParams.get(KEY_ORDER) ?? '');
	const acceptableParam = optionsValue.find((value) => value === param);
	const [sortSelectValue, setSortSelectValue] = useState(acceptableParam ?? optionsValue[0]);
	const [sortBy, order] = splitSortOrder(sortSelectValue);

	useEffect(() => {
		if (acceptableParam) {
			return;
		}

		setUrlParams(
			(prev) => {
				prev.delete(KEY_SORT_BY);
				prev.delete(KEY_ORDER);

				return prev;
			},
			{ replace: true },
		);
	}, [acceptableParam, setUrlParams]);

	const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setSortSelectValue(value);

		const [sortBy, order] = splitSortOrder(value);

		if (!order) {
			return;
		}

		setUrlParams(
			(prev) => {
				if (value === optionsValue[0]) {
					prev.delete(KEY_SORT_BY);
					prev.delete(KEY_ORDER);
				} else {
					prev.set(KEY_SORT_BY, sortBy);
					prev.set(KEY_ORDER, order);
				}

				return prev;
			},
			{ replace: true },
		);
	};

	return { sortBy, order, sortSelectValue, handleChangeSort };
};

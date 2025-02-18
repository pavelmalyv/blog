import { SORT_ORDER_VALUES } from '../constants/api';

export const splitSortOrder = (sortParam: string) => {
	const paramsArray = sortParam.split('|');
	const sortBy = paramsArray[0];
	const order = paramsArray.length === 2 ? paramsArray[1] : undefined;
	return [sortBy, SORT_ORDER_VALUES.find((item) => item === order)] as const;
};

export const joinSortOrder = (sort: string, order: string) => `${sort}|${order}`;

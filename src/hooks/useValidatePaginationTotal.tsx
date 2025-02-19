import { useEffect } from 'react';
import { getPages } from '../utils/pagination';
import { useLocation, useNavigate } from 'react-router';

interface useValidatePaginationTotalProps {
	limit: number;
	total?: number;
	currentPage?: number;
	paginationUrlCallback: (page: string) => string;
}

export const useValidatePaginationTotal = ({
	limit,
	total,
	currentPage,
	paginationUrlCallback,
}: useValidatePaginationTotalProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	let page: number | undefined;
	let totalPages: number | undefined;

	if (total && currentPage) {
		totalPages = getPages(limit, total);

		if (currentPage <= totalPages) {
			page = currentPage;
		}
	}

	useEffect(() => {
		if (page || !totalPages) {
			return;
		}

		navigate(paginationUrlCallback(totalPages + location.search), { replace: true });
	}, [page, navigate, paginationUrlCallback, totalPages, location.search]);

	return page;
};

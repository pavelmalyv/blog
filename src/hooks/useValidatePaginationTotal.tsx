import { useEffect } from 'react';
import type { UrlPagination } from '../types/routes';
import { getPages } from '../utils/pagination';
import { useNavigate } from 'react-router';

interface useValidatePaginationTotalProps {
	limit: number;
	total?: number;
	currentPage?: number;
	createPaginationUrl: UrlPagination;
}

const useValidatePaginationTotal = ({
	limit,
	total,
	currentPage,
	createPaginationUrl,
}: useValidatePaginationTotalProps) => {
	const navigate = useNavigate();

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

		navigate(createPaginationUrl(totalPages));
	}, [page, navigate, createPaginationUrl, totalPages]);

	return page;
};

export default useValidatePaginationTotal;

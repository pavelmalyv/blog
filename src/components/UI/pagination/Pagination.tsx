import ReactPaginate from 'react-paginate';
import type { UrlPagination } from '../../../types/routes';
import classNames from 'classnames';
import cl from './Pagination.module.scss';
import { getPages } from '../../../utils/pagination';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import HiddenLoadingMessage from '../hiddenLoadingMessage/HiddenLoadingMessage';
import useDelayAnimationLoading from '../../../hooks/useDelayAnimationLoading';
import Icon from '../icon/Icon';

const ButtonContent = ({ previous }: { previous: boolean }) => {
	return (
		<>
			<span className={cl['button-icon']} aria-hidden="true">
				<Icon>{previous ? 'arrow_back' : 'arrow_forward'}</Icon>
			</span>
			<span>{previous ? 'Previous' : 'Next'}</span>
		</>
	);
};

interface PaginationProps {
	limit: number;
	total: number;
	currentPage: number;
	urlBase: string;
	createUrl: UrlPagination;
	isLoading: boolean;
}

const Pagination = ({
	limit,
	total,
	currentPage,
	urlBase,
	createUrl,
	isLoading,
}: PaginationProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const totalPages = getPages(limit, total);
	const [selectedPage, setSelectedPage] = useState(currentPage);

	useEffect(() => {
		const url = selectedPage === 1 ? urlBase : createUrl(selectedPage);
		navigate(url + location.search);
	}, [navigate, createUrl, urlBase, selectedPage, location.search]);

	const isLoadingDelay = useDelayAnimationLoading(isLoading);

	return (
		<div
			className={classNames(cl.pagination, { [cl['pagination_loading-delay']]: isLoadingDelay })}
			aria-busy={isLoading}
		>
			<HiddenLoadingMessage isLoading={isLoading} message={`Loading page ${selectedPage}`} />

			<ReactPaginate
				pageCount={totalPages}
				nextLabel={<ButtonContent previous={false} />}
				previousLabel={<ButtonContent previous={true} />}
				pageRangeDisplayed={2}
				marginPagesDisplayed={1}
				onPageChange={({ selected }) => setSelectedPage(selected + 1)}
				forcePage={selectedPage - 1}
				containerClassName={cl.list}
				pageClassName={cl.item}
				pageLinkClassName={cl.link}
				breakClassName={cl.item}
				breakLinkClassName={cl.link}
				previousLinkClassName={classNames(cl.button, cl['button_prev'])}
				nextLinkClassName={classNames(cl.button, cl['button_next'])}
			/>
		</div>
	);
};

export default Pagination;

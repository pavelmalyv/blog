import classNames from 'classnames';
import cl from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import Icon from '@components/UI/icon/Icon';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';

import { getPages } from '@/utils/pagination';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useDelayAnimationLoading } from '@hooks/useDelayAnimationLoading';

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
	isLoading: boolean;
	urlCallback: (page: number) => string;
}

const Pagination = ({
	limit,
	total,
	currentPage,
	urlBase,
	isLoading,
	urlCallback,
}: PaginationProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const totalPages = getPages(limit, total);
	const isLoadingDelay = useDelayAnimationLoading(isLoading);
	const [selectedPage, setSelectedPage] = useState(currentPage);

	useEffect(() => {
		const baseUrl = selectedPage === 1 ? urlBase : urlCallback(selectedPage);
		const url = baseUrl + location.search;
		const currentUrl = location.pathname + location.search;

		if (url === currentUrl) {
			return;
		}

		navigate(url);
	}, [navigate, urlCallback, urlBase, selectedPage, location.pathname, location.search]);

	const handlePageChange = ({ selected }: { selected: number }) => {
		setSelectedPage(selected + 1);
	};

	return (
		<>
			{totalPages > 1 && (
				<VisuallyHiddenLoader isFetching={isLoading} hiddenMessage={`Loading page ${selectedPage}`}>
					<div
						className={classNames(cl.pagination, {
							[cl['pagination_loading-delay']]: isLoadingDelay,
						})}
					>
						<ReactPaginate
							pageCount={totalPages}
							nextLabel={<ButtonContent previous={false} />}
							previousLabel={<ButtonContent previous={true} />}
							pageRangeDisplayed={2}
							marginPagesDisplayed={1}
							onPageChange={handlePageChange}
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
				</VisuallyHiddenLoader>
			)}
		</>
	);
};

export default Pagination;

import cl from './Author.module.scss';
import Skeleton from 'react-loading-skeleton';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorBoundaryDisplay from '@components/errorBoundaryDisplay/ErrorBoundaryDisplay';

import { useEffect } from 'react';
import { Link } from 'react-router';
import { useLazyGetUserByIdQuery } from '@/api/usersSlice';
import { authorUrl } from '@/routes/routes';
import { ERROR_MESSAGES } from '@/constants/error';
import { MESSAGES } from '@/constants/messages';

interface AuthorProps {
	id: string | null;
	isCurrentPageAuthor?: boolean;
}

const Author = ({ id, isCurrentPageAuthor = false }: AuthorProps) => {
	const [getUserByIdQuery, { data, isLoading, isError }] = useLazyGetUserByIdQuery();

	useEffect(() => {
		if (!id || data || isLoading) {
			return;
		}

		getUserByIdQuery(id, true);
	}, [id, data, isLoading, getUserByIdQuery]);

	let author: React.ReactNode;
	if (data && id) {
		if (isCurrentPageAuthor) {
			author = data.firstName + ' ' + data.lastName;
		} else {
			author = (
				<Link to={authorUrl.profile(data.id)} className={cl.link}>
					{data.firstName + ' ' + data.lastName}
				</Link>
			);
		}
	} else {
		author = <Skeleton width="4em" />;
	}

	return (
		<VisuallyHiddenLoader
			isFetching={isLoading}
			hiddenMessage={MESSAGES.authorLoading}
			isRoleStatus={false}
		>
			<ErrorBoundaryDisplay isError={isError} errorMessage={ERROR_MESSAGES.authorLoad}>
				{author}
			</ErrorBoundaryDisplay>
		</VisuallyHiddenLoader>
	);
};

export default Author;

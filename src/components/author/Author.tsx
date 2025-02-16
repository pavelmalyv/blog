import cl from './Author.module.scss';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Skeleton from 'react-loading-skeleton';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';

import { useEffect } from 'react';
import { Link } from 'react-router';
import { useLazyGetUserByIdQuery } from '../../api/usersSlice';
import { authorUrl } from '../../routes/routes';
import { ERROR_MESSAGES } from '../../constants/error';
import { MESSAGES } from '../../constants/messages';

interface AuthorProps {
	id: string | null;
}

const Author = ({ id }: AuthorProps) => {
	const [getUserByIdQuery, { data, isLoading, isFetching, isError }] = useLazyGetUserByIdQuery();

	const isBusy = isLoading && isFetching;

	useEffect(() => {
		if (!id || data || isLoading) {
			return;
		}

		getUserByIdQuery(id, true);
	}, [id, data, isLoading, getUserByIdQuery]);

	let author: React.ReactNode;
	if (isError) {
		author = <ErrorMessage message={ERROR_MESSAGES.userLoad} />;
	} else if (data && id) {
		author = (
			<Link to={authorUrl.profile(data.id)} className={cl.author}>
				{data.firstName + ' ' + data.lastName}
			</Link>
		);
	} else {
		author = <Skeleton width="4em" />;
	}

	return (
		<span aria-busy={isBusy}>
			<HiddenLoadingMessage
				isLoading={isBusy}
				message={MESSAGES.authorLoading}
				isRoleStatus={false}
			/>

			{author}
		</span>
	);
};

export default Author;

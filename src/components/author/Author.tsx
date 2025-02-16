import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Skeleton from 'react-loading-skeleton';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';

import { useEffect } from 'react';
import { useLazyGetUserByIdQuery } from '../../api/usersSlice';
import { ERROR_MESSAGES } from '../../constants/error';
import { MESSAGES } from '../../constants/messages';

interface AuthorProps {
	id: string | null;
}

const Author = ({ id }: AuthorProps) => {
	const [getUserByIdQuery, { data, isLoading, isFetching, isError }] = useLazyGetUserByIdQuery();

	useEffect(() => {
		if (!id || data || (isLoading && isFetching)) {
			return;
		}

		getUserByIdQuery(id, true);
	}, [id, data, isLoading, isFetching, getUserByIdQuery]);

	let author: React.ReactNode;
	if (isError) {
		author = <ErrorMessage message={ERROR_MESSAGES.userLoad} />;
	} else if (data && id) {
		author = data.firstName + ' ' + data.lastName;
	} else {
		author = <Skeleton width="4em" />;
	}

	return (
		<span aria-busy={isLoading}>
			<HiddenLoadingMessage
				isLoading={isLoading}
				message={MESSAGES.authorLoading}
				isRoleStatus={false}
			/>

			{author}
		</span>
	);
};

export default Author;

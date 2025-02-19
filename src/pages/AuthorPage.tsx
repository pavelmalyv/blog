import Heading from '../components/UI/heading/Heading';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import User from '../components/user/User';

import { useParams } from 'react-router';
import { useGetUserByIdQuery } from '../api/usersSlice';
import { throwNotFoundIfInvalid, throwNotFoundIfStatus } from '../utils/error';
import { ERROR_MESSAGES } from '../constants/error';

const AuthorPage = () => {
	const params = useParams<{ id?: string }>();
	const authorId = throwNotFoundIfInvalid(params.id);
	const { data: user, isError, error } = useGetUserByIdQuery(authorId);

	let body: React.ReactNode;
	if (isError) {
		throwNotFoundIfStatus(error);

		body = <ErrorMessage message={ERROR_MESSAGES.authorLoad} />;
	} else {
		const fullName = user ? `${user.firstName} ${user.lastName}` : null;

		body = (
			<>
				<Heading title={fullName} />
				<User user={user ?? null} />
			</>
		);
	}

	return body;
};

export default AuthorPage;

import Heading from '../components/UI/heading/Heading';

import { useParams } from 'react-router';
import { throwNotFoundIfInvalid } from '../utils/error';
import { useGetUserByIdQuery } from '../api/usersSlice';

const AuthorPage = () => {
	const params = useParams<{ id?: string }>();
	const authorId = throwNotFoundIfInvalid(params.id);
	const { data: user } = useGetUserByIdQuery(authorId);

	const fullName = user ? `${user.firstName} ${user.lastName}` : null;
	return (
		<>
			<Heading title={fullName} />
		</>
	);
};

export default AuthorPage;

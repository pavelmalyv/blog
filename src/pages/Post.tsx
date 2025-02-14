import { useParams } from 'react-router';

const Post = () => {
	const params = useParams<{ id?: string }>();

	return <div>Article {params.id}</div>;
};

export default Post;

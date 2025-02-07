import { useGetPostsQuery } from '../../api/postsSlice';
import Section from '../UI/Section/Section';

const RecentPosts = () => {
	const { data } = useGetPostsQuery();
	console.log(data);

	return <Section title="Recent blog posts">Section</Section>;
};

export default RecentPosts;

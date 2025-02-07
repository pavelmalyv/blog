import RecentPosts from '../components/recentPosts/RecentPosts';
import Heading from '../components/UI/heading/Heading';

const Home = () => {
	return (
		<>
			<Heading title="The blog" />
			<RecentPosts />
		</>
	);
};

export default Home;

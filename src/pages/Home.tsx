import PopularPosts from '../components/popularPosts/PopularPosts';
import PostsList from '../components/postsList/PostsList';
import Heading from '../components/UI/heading/Heading';

const Home = () => {
	return (
		<>
			<Heading title="The blog" />
			<PopularPosts />
			<PostsList />
		</>
	);
};

export default Home;

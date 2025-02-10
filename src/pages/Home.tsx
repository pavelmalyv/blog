import PopularPosts from '../components/popularPosts/PopularPosts';
import Heading from '../components/UI/heading/Heading';

const Home = () => {
	return (
		<>
			<Heading title="The blog" />
			<PopularPosts />
		</>
	);
};

export default Home;

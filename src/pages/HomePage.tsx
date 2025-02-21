import PopularPosts from '@components/popularPosts/PopularPosts';
import AllPosts from '@components/allPosts/AllPosts';
import Heading from '@components/UI/heading/Heading';

const HomePage = () => {
	return (
		<>
			<Heading title="The blog" />
			<PopularPosts />
			<AllPosts />
		</>
	);
};

export default HomePage;

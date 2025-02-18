import Newsletters from '../components/newsletters/Newsletters';
import RecentPosts from '../components/recentPosts/RecentPosts';
import Section from '../components/UI/section/Section';

const NewslettersPage = () => {
	return (
		<>
			<Newsletters titleLevel={1} />
			<Section title="Recent blog posts">
				<RecentPosts limit={3} />
			</Section>
		</>
	);
};

export default NewslettersPage;

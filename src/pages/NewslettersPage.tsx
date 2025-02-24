import Newsletters from '@components/newsletters/Newsletters';
import RecentPosts from '@components/recentPosts/RecentPosts';
import Section from '@components/UI/section/Section';

import { useTitle } from '@hooks/useTitle';

const NewslettersPage = () => {
	useTitle('Newsletters');

	return (
		<>
			<Newsletters titleLevel={1} />
			<Section title="Recent blog posts">
				<RecentPosts limit={3} stretchLast={true} />
			</Section>
		</>
	);
};

export default NewslettersPage;

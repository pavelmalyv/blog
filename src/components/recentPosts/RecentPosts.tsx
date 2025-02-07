import type { Posts } from '../../types/posts';
import cl from './RecentPosts.module.scss';
import { useGetPostsQuery } from '../../api/postsSlice';
import Section from '../UI/Section/Section';
import PostCard from '../postCard/PostCard';

const RecentPosts = () => {
	let posts: Posts | null[] = Array(6).fill(null);

	const { data, isLoading } = useGetPostsQuery();
	if (!isLoading && data) {
		posts = data.posts;
	}

	return (
		<Section title="Recent blog posts">
			<ul className={cl.list}>
				{posts.map((post, i) => {
					const key = post ? post.id : i;

					return (
						<li key={key}>
							<PostCard post={post} />
						</li>
					);
				})}
			</ul>
		</Section>
	);
};

export default RecentPosts;

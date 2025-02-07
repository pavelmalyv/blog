import type { Posts } from '../../types/posts';
import cl from './RecentPosts.module.scss';
import { useGetPostsQuery } from '../../api/postsSlice';
import Section from '../UI/section/Section';
import PostCard from '../postCard/PostCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import { ERROR_MESSAGES } from '../../constants/error';

const RecentPosts = () => {
	let posts: Posts | null[] = Array(6).fill(null);

	const { data, isLoading, isError } = useGetPostsQuery();
	if (!isLoading && data) {
		posts = data.posts;
	}

	let body: React.ReactNode;

	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postsLoad} />;
	} else {
		body = (
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
		);
	}

	return <Section title="Recent blog posts">{body}</Section>;
};

export default RecentPosts;

import type { Posts } from '../../types/posts';
import { useGetPostsQuery } from '../../api/postsSlice';
import PostCard from '../postCard/PostCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Section from '../UI/section/Section';
import cl from './PostsList.module.scss';
import { ERROR_MESSAGES } from '../../constants/error';

const PostsList = () => {
	const limit = 9;
	let posts: Posts | null[] = Array(limit).fill(null);

	const { data, isLoading, isError } = useGetPostsQuery({ limit, skip: 0 });
	if (!isLoading && data) {
		posts = data.posts;
	}

	let body: React.ReactNode;
	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postsLoad} />;
	} else {
		body = (
			<>
				<HiddenLoadingMessage isLoading={isLoading} />

				<ul className={cl.list}>
					{posts.map((post, i) => {
						const key = post ? post.id : i;

						return (
							<li className={cl.item} key={key}>
								<PostCard post={post} />
							</li>
						);
					})}
				</ul>
			</>
		);
	}

	return (
		<Section title="All blog posts">
			<div aria-busy={isLoading}>{body}</div>
		</Section>
	);
};

export default PostsList;

import type { Posts } from '../../types/posts';
import cl from './RecentPosts.module.scss';
import { useGetPostsQuery } from '../../api/postsSlice';
import Section from '../UI/section/Section';
import PostCard from '../postCard/PostCard';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import { ERROR_MESSAGES } from '../../constants/error';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';

const RecentPosts = () => {
	let posts: Posts | null[] = Array(4).fill(null);

	const { data, isLoading, isError } = useGetPostsQuery({ limit: 4, skip: 0, sortBy: 'userId' });
	if (!isLoading && data) {
		posts = data.posts;
	}

	const stylesPostCard = [
		'dynamic-height',
		'small-horizontal',
		'small-horizontal',
		'large',
	] as const;

	let body: React.ReactNode;
	if (isError) {
		body = <ErrorMessage message={ERROR_MESSAGES.postsLoad} />;
	} else {
		body = (
			<div aria-busy={isLoading}>
				<HiddenLoadingMessage isLoading={isLoading} />

				<ul className={cl.list}>
					{posts.map((post, i) => {
						const key = post ? post.id : i;

						return (
							<li className={cl.item} key={key}>
								<PostCard post={post} styleCard={stylesPostCard[i]} />
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	return <Section title="Recent blog posts">{body}</Section>;
};

export default RecentPosts;

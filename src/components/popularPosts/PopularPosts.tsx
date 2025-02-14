import type { Posts } from '../../types/posts';

import cl from './PopularPosts.module.scss';
import PostCard from '../postCard/PostCard';
import Section from '../UI/section/Section';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import Message from '../UI/message/Message';
import { useGetPostsQuery } from '../../api/postsSlice';
import { MESSAGES } from '../../constants/messages';
import { ERROR_MESSAGES } from '../../constants/error';

const PopularPosts = () => {
	let posts: Posts | null[] = Array(4).fill(null);
	let total: number | undefined;

	const { data, isLoading, isError } = useGetPostsQuery({
		limit: 4,
		skip: 0,
		sortBy: 'views',
		order: 'desc',
	});
	if (!isLoading && data) {
		posts = data.posts;
		total = data.total;
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
	} else if (total === 0) {
		body = <Message message={MESSAGES.postsEmpty} />;
	} else {
		body = (
			<>
				<HiddenLoadingMessage isLoading={isLoading} message={MESSAGES.postsLoading} />

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
			</>
		);
	}

	return (
		<Section title="Popular blog posts">
			<div aria-busy={isLoading}>{body}</div>
		</Section>
	);
};

export default PopularPosts;

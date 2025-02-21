import cl from './PostsList.module.scss';
import classNames from 'classnames';
import PostCard from '@components/postCard/PostCard';
import Message from '@components/UI/message/Message';

import { useDelayAnimationLoading } from '@hooks/useDelayAnimationLoading';
import { Posts } from '@/types/posts';
import { MESSAGES } from '@/constants/messages';

interface PostsListProps {
	posts: Posts | null[];
	isFetching?: boolean;
	stretchLast?: boolean;
	isCurrentPageAuthor?: boolean;
	direction?: 'horizontal' | 'vertical';
}

const PostsList = ({
	posts,
	isFetching = false,
	stretchLast = false,
	isCurrentPageAuthor,
	direction = 'horizontal',
}: PostsListProps) => {
	const idFetchingDelay = useDelayAnimationLoading(isFetching);

	return (
		<div
			className={classNames(cl.posts, {
				[cl['posts_is-animation-posts']]: idFetchingDelay,
			})}
		>
			{posts.length > 0 ? (
				<>
					{isFetching && <div className={cl.overlay}></div>}

					<ul
						className={classNames(cl.list, cl[`list_${direction}`], {
							[cl['list_stretch-last']]: stretchLast,
						})}
					>
						{posts.map((post, i) => {
							const key = post ? post.id : i;

							return (
								<li className={cl.item} key={key}>
									<PostCard post={post} isCurrentPageAuthor={isCurrentPageAuthor} />
								</li>
							);
						})}
					</ul>
				</>
			) : (
				<>
					{isFetching ? (
						<div className={cl['spinner-wrapper']}>
							<div className={cl.spinner}></div>
						</div>
					) : (
						<Message message={MESSAGES.postsEmpty} />
					)}
				</>
			)}
		</div>
	);
};

export default PostsList;

import { Posts as PostsType } from '@/types/posts';

import cl from './PostsList.module.scss';
import classNames from 'classnames';
import PostCard from '@components/postCard/PostCard';
import MessageInfo from '@/components/UI/messageInfo/MessageInfo';

import { createCompoundContext } from '@/context/createCompoundContext';
import { useDelayedLoader } from '@hooks/useDelayedLoader';
import { MESSAGES } from '@/constants/messages';

const [usePostsListContext, PostsListProvider] = createCompoundContext<{
	isFetching: boolean;
}>();

interface PostsListProps {
	isFetching?: boolean;
	children: React.ReactNode;
}

const PostsList = ({ isFetching = false, children }: PostsListProps) => {
	const isFetchingDelay = useDelayedLoader(isFetching);

	return (
		<PostsListProvider value={{ isFetching: isFetching }}>
			<div
				className={classNames(cl.posts, {
					[cl['posts_is-animation-posts']]: isFetchingDelay,
				})}
			>
				{children}
			</div>
		</PostsListProvider>
	);
};

interface PostsProps {
	posts: PostsType | null[];
	stretchLast?: boolean;
	isCurrentPageAuthor?: boolean;
	direction?: 'horizontal' | 'vertical';
}

const Posts = ({
	posts,
	stretchLast = false,
	isCurrentPageAuthor,
	direction = 'horizontal',
}: PostsProps) => {
	const { isFetching } = usePostsListContext();

	return (
		<>
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
						<MessageInfo message={MESSAGES.postsEmpty} />
					)}
				</>
			)}
		</>
	);
};

PostsList.Posts = Posts;

export default PostsList;

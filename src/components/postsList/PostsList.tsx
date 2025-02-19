import cl from './PostsList.module.scss';
import classNames from 'classnames';
import PostCard from '../postCard/PostCard';
import Message from '../UI/message/Message';

import { Posts } from '../../types/posts';
import { MESSAGES } from '../../constants/messages';

interface PostsListProps {
	posts: Posts | null[];
	stretchLast?: boolean;
	direction?: 'horizontal' | 'vertical';
}

const PostsList = ({ posts, stretchLast = false, direction = 'horizontal' }: PostsListProps) => {
	return (
		<>
			{posts.length > 0 ? (
				<ul
					className={classNames(cl.list, cl[`list_${direction}`], {
						[cl['list_stretch-last']]: stretchLast,
					})}
				>
					{posts.map((post, i) => {
						const key = post ? post.id : i;

						return (
							<li className={cl.item} key={key}>
								<PostCard post={post} />
							</li>
						);
					})}
				</ul>
			) : (
				<Message message={MESSAGES.postsEmpty} />
			)}
		</>
	);
};

export default PostsList;

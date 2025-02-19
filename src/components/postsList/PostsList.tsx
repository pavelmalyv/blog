import cl from './PostsList.module.scss';
import classNames from 'classnames';
import PostCard from '../postCard/PostCard';
import Message from '../UI/message/Message';

import { Posts } from '../../types/posts';
import { MESSAGES } from '../../constants/messages';

interface PostsListProps {
	posts: Posts | null[];
	direction?: 'horizontal' | 'vertical';
}

const PostsList = ({ posts, direction = 'horizontal' }: PostsListProps) => {
	return (
		<>
			{posts.length > 0 ? (
				<ul className={classNames(cl.list, cl[`list_${direction}`])}>
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

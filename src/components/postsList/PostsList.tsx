import cl from './PostsList.module.scss';
import PostCard from '../postCard/PostCard';

import { Posts } from '../../types/posts';

interface PostsListProps {
	posts: Posts | null[];
}

const PostsList = ({ posts }: PostsListProps) => {
	return (
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
	);
};

export default PostsList;

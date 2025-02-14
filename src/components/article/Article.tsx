import { useId } from 'react';
import type { Post } from '../../types/posts';

import cl from './Article.module.scss';
import Skeleton from 'react-loading-skeleton';

interface ArticleProps {
	post: Post | null;
}

const Article = ({ post }: ArticleProps) => {
	const idArticle = useId();

	return (
		<article className={cl.article} aria-labelledby={idArticle}>
			<h1 id="idArticle" className="h1">
				{post ? post.title : <Skeleton />}
			</h1>
		</article>
	);
};

export default Article;

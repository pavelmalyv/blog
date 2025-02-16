import type { Post } from '../../types/posts';

import classNames from 'classnames';
import cl from './Article.module.scss';
import Skeleton from 'react-loading-skeleton';
import Tags from '../UI/tags/Tags';
import Text from '../UI/text/Text';
import parse from 'html-react-parser';

import { Link } from 'react-router';
import { useId } from 'react';

interface ArticleProps {
	post: Post | null;
	labelledby?: boolean;
}

const Article = ({ post, labelledby = true }: ArticleProps) => {
	const idArticle = useId();

	return (
		<article className={cl.article} aria-labelledby={labelledby ? idArticle : undefined}>
			<div className={classNames('date', cl.about)}>
				<div className={cl.date}>Sunday , 1 Jan 2023</div>
				<div className={cl.author}>
					<div className={cl['author-label']}>Author:</div>
					<Link to={'other'} className={cl['author-link']}>
						Aria Parker
					</Link>
				</div>
			</div>
			<h1 id={idArticle} className={classNames('h1', cl.title)}>
				{post ? post.title : <Skeleton />}
			</h1>
			{post && (
				<picture className={cl['image']}>
					<source srcSet={post.image.webp} type="image/webp" />
					<img
						className={cl['image-img']}
						src={post.image.src}
						width={post.image.width}
						height={post.image.height}
						alt={post.image.alt}
					/>
				</picture>
			)}
			</div>
			<div className={classNames('text', cl.body)}>
				<Text>
					{post ? (
						parse(post.body)
					) : (
						<Text.Skeleton>
							<Skeleton count={3} />
							<Skeleton height={400} />
							<Skeleton count={4} />
							<Skeleton count={3} />
							<Skeleton height={400} />
							<Skeleton count={4} />
						</Text.Skeleton>
					)}
				</Text>
			</div>
			<div className={cl.tags}>{post && <Tags tags={post.tags} />}</div>
		</article>
	);
};

export default Article;

import type { Post } from '../../types/posts';

import classNames from 'classnames';
import cl from './Article.module.scss';
import Skeleton from 'react-loading-skeleton';
import Tags from '../UI/tags/Tags';
import Text from '../UI/text/Text';
import Author from '../author/Author';
import parse from 'html-react-parser';

import { useId } from 'react';
import { getDisplayDate } from '../../utils/date';

interface ArticleProps {
	post: Post | null;
	labelledby?: boolean;
}

const Article = ({ post, labelledby = true }: ArticleProps) => {
	const idArticle = useId();

	return (
		<article className={cl.article} aria-labelledby={labelledby ? idArticle : undefined}>
			<div className={classNames('date', cl.about)}>
				<div className={cl.date}>
					{post ? getDisplayDate(post.createdAt, { weekday: true }) : <Skeleton width="12em" />}
				</div>
				<div className={cl.author}>
					{post && <div className={cl['author-label']}>Author:</div>}
					<Author id={post?.userId ?? null} />
				</div>
			</div>
			<h1 id={idArticle} className={classNames('h1', cl.title)}>
				{post ? post.title : <Skeleton />}
			</h1>
			<div className={cl.image}>
				{post ? (
					<picture className={cl['image-wrapper']}>
						<source srcSet={post.image.webp} type="image/webp" />
						<img
							className={cl['image-img']}
							src={post.image.src}
							width={post.image.width}
							height={post.image.height}
							alt={post.image.alt}
						/>
					</picture>
				) : (
					<Skeleton height={500} />
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

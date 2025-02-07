import type { Post } from '../../types/posts';
import classNames from 'classnames';
import cl from './PostCard.module.scss';
import { Link } from 'react-router';
import { truncate } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import Tags from '../UI/tags/Tags';
import { useLazyGetUserByIdQuery } from '../../api/usersSlice';
import { useEffect } from 'react';
import { getDisplayDate } from '../../utils/date';

interface PostCardProps {
	post: Post | null;
	style?: 'small' | 'small-horizontal' | 'medium' | 'large';
}

const PostCard = ({ post, style = 'small' }: PostCardProps) => {
	let description: React.ReactNode;
	if (post) {
		description = truncate(post.body, {
			length: 90,
			separator: /,? +/,
		});
	} else {
		description = <Skeleton count={2} />;
	}

	const [getUserByIdQuery, { data: dataAuthor, isLoading: isLoadingAuthor }] =
		useLazyGetUserByIdQuery();

	let about: React.ReactNode;
	if (!post || isLoadingAuthor) {
		about = <Skeleton />;
	} else if (dataAuthor) {
		const authorName = dataAuthor.firstName + ' ' + dataAuthor.lastName;
		about = authorName + ' • ' + getDisplayDate(post.createdAt);
	}

	useEffect(() => {
		if (!post || isLoadingAuthor || dataAuthor) {
			return;
		}

		getUserByIdQuery(post.userId, true);
	}, [post, isLoadingAuthor, dataAuthor, getUserByIdQuery]);

	return (
		<article className={classNames(cl.card, cl[`card-${style}`])}>
			<div className={cl.image}>
				{post ? (
					<picture>
						<img
							className={cl['image-img']}
							src="https://dummyjson.com/image/768x480/008080/ffffff?text=Blog"
							alt=""
							width="768"
							height="480"
						/>
					</picture>
				) : (
					<Skeleton width="100%" height="100%" />
				)}
			</div>

			<div className={cl.body}>
				<div className={cl.about}>{about}</div>
				<div className={classNames('h3', cl.title)}>
					{post ? (
						<Link className={cl['title-link']} to="#">
							<h3 className={cl['title-text']}>{post.title}</h3>
							<span className={cl['title-icon']} aria-hidden="true">
								<span className="material-symbols-outlined">arrow_outward</span>
							</span>
						</Link>
					) : (
						<Skeleton />
					)}
				</div>
				<div className={cl.description}>{description}</div>
				<div className={cl.tags}>
					<Tags tags={post ? post.tags : null} />
				</div>
			</div>
		</article>
	);
};

export default PostCard;

import type { Post } from '../../types/posts';
import classNames from 'classnames';
import cl from './PostCard.module.scss';
import { Link } from 'react-router';
import { truncate } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import Tags from '../UI/tags/Tags';
import { useLazyGetUserByIdQuery } from '../../api/usersSlice';
import { useEffect, useId } from 'react';
import { getDisplayDate } from '../../utils/date';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import { ERROR_MESSAGES } from '../../constants/error';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';

interface PostCardProps {
	post: Post | null;
	styleCard?: 'small' | 'small-horizontal' | 'dynamic-height' | 'large';
}

const PostCard = ({ post, styleCard = 'small' }: PostCardProps) => {
	const idTitle = useId();

	let description: React.ReactNode;
	if (post) {
		const length = styleCard === 'large' ? 370 : 90;

		description = truncate(post.body, {
			length,
			separator: /,? +/,
		});
	} else {
		description = <Skeleton count={2} />;
	}

	const [
		getUserByIdQuery,
		{ data: dataAuthor, isLoading: isLoadingAuthor, isError: isErrorAuthor },
	] = useLazyGetUserByIdQuery();

	let author: React.ReactNode;
	if (isErrorAuthor) {
		author = <ErrorMessage message={ERROR_MESSAGES.userLoad} />;
	} else if (dataAuthor && post) {
		author = dataAuthor.firstName + ' ' + dataAuthor.lastName;
	} else {
		author = <Skeleton width="4em" />;
	}

	let createdAt: React.ReactNode;
	if (post) {
		createdAt = <span className={cl['about-date']}>• {getDisplayDate(post.createdAt)}</span>;
	} else {
		createdAt = <Skeleton width="6em" />;
	}

	useEffect(() => {
		if (!post || isLoadingAuthor || dataAuthor) {
			return;
		}

		getUserByIdQuery(post.userId, true);
	}, [post, isLoadingAuthor, dataAuthor, getUserByIdQuery]);

	return (
		<article className={classNames(cl.card, cl[`card-${styleCard}`])} aria-labelledby={idTitle}>
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
				<div className={cl.about}>
					<span aria-busy={isLoadingAuthor}>
						<HiddenLoadingMessage isLoading={isLoadingAuthor} isRoleStatus={false} />

						{author}
					</span>
					{createdAt}
				</div>
				<div
					className={classNames(cl.title, {
						h3: styleCard != 'small-horizontal',
						h4: styleCard === 'small-horizontal',
					})}
				>
					{post ? (
						<Link className={cl['title-link']} to="#">
							<h3 id={idTitle} className={cl['title-text']}>
								{post.title}
							</h3>
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

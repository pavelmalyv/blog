import type { User } from '../../types/users';

import cl from './User.module.scss';
import classNames from 'classnames';
import Section from '../UI/section/Section';
import Skeleton from 'react-loading-skeleton';
import Text from '../UI/text/Text';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';

import { MESSAGES } from '../../constants/messages';
import { useId } from 'react';

interface UserProps {
	user: User | null;
}

const User = ({ user }: UserProps) => {
	const isLoading = !user;
	const titleId = useId();

	return (
		<Section aria-labelledby={titleId}>
			<div aria-busy={isLoading}>
				<HiddenLoadingMessage isLoading={isLoading} message={MESSAGES.authorLoading} />

				<div className={cl.image}>
					{user ? (
						<picture>
							<source srcSet={user.image.webp} type="image/webp" />
							<img
								className={cl['image-img']}
								src={user.image.src}
								width={user.image.width}
								height={user.image.height}
								alt={user.image.alt}
							/>
						</picture>
					) : (
						<div className={cl['image-skeleton']}>
							<Skeleton height="100%" />
						</div>
					)}
				</div>

				<h2 id={titleId} className={classNames('h2', cl.title)}>
					{user ? 'About Me' : <Skeleton />}
				</h2>

				<Text>{user ? user.description : <Skeleton count={3} />}</Text>
			</div>
		</Section>
	);
};

export default User;

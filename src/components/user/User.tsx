import type { User } from '../../types/users';

import cl from './User.module.scss';
import classNames from 'classnames';
import Section from '../UI/section/Section';
import Skeleton from 'react-loading-skeleton';
import Text from '../UI/text/Text';
import HiddenLoadingMessage from '../UI/hiddenLoadingMessage/HiddenLoadingMessage';
import parse from 'html-react-parser';

import { MESSAGES } from '../../constants/messages';
import { useId } from 'react';

interface UserTextProps {
	title: string;
	titleId?: string;
	text?: string;
}

const UserTextItem = ({ title, titleId, text }: UserTextProps) => {
	return (
		<div>
			<h2 id={titleId} className={classNames('h2', cl.title)}>
				{text ? title : <Skeleton />}
			</h2>

			<Text>{text ? parse(text) : <Skeleton count={3} />}</Text>
		</div>
	);
};

interface UserProps {
	user: User | null;
}

const User = ({ user }: UserProps) => {
	const isLoading = !user;
	const titleId = useId();

	return (
		<Section aria-labelledby={titleId}>
			<div className={cl.body} aria-busy={isLoading}>
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

				<UserTextItem title="About Me" titleId={titleId} text={user?.description} />
				<UserTextItem title="Skills:" text={user?.skills} />
				<UserTextItem title="Experience:" text={user?.experience} />
			</div>
		</Section>
	);
};

export default User;

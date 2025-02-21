import cl from './ErrorScreen.module.scss';
import LinkButton from '@components/UI/linkButton/LinkButton';

import { useId } from 'react';

interface ErrorProps {
	title: string;
	description: string;
	isLink?: boolean;
}

const ErrorScreen = ({ title, description, isLink = true }: ErrorProps) => {
	const titleId = useId();

	return (
		<section className={cl.error} aria-labelledby={titleId}>
			<div className="container">
				<div className={cl.body}>
					<h1 id={titleId} className={cl.title}>
						{title}
					</h1>
					<div className={cl.description}>{description}</div>

					{isLink && <LinkButton to="/">Home</LinkButton>}
				</div>
			</div>
		</section>
	);
};

export default ErrorScreen;

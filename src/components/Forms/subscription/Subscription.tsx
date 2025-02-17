import cl from './Subscription.module.scss';
import classNames from 'classnames';
import Button from '../../UI/button/Button';

import { useId } from 'react';
import { Link } from 'react-router';

interface SubscriptionProps {
	title: string;
	isHiddenTitle?: boolean;
	children: React.ReactNode;
	noValidate?: boolean;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Subscription = ({
	title,
	isHiddenTitle = true,
	children,
	noValidate,
	onSubmit,
}: SubscriptionProps) => {
	const idHead = useId();

	return (
		<form className={cl.form} onSubmit={onSubmit} aria-labelledby={idHead} noValidate={noValidate}>
			<h3 id={idHead} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>

			<div className={cl.body}>
				{children}

				<Button type="submit" mobileFull={true}>
					Subscribe
				</Button>
			</div>
			<small className={cl.policy}>
				<span>We care about your data in our </span>
				<Link to="#" className="link">
					privacy policy
				</Link>
			</small>
		</form>
	);
};

export default Subscription;

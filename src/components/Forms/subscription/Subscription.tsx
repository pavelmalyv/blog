import cl from './Subscription.module.scss';
import classNames from 'classnames';

import { useId } from 'react';

interface SubscriptionProps {
	title: string;
	isHiddenTitle?: boolean;
	children: React.ReactNode;
}

const Subscription = ({ title, isHiddenTitle = true, children }: SubscriptionProps) => {
	const idHead = useId();

	return (
		<form aria-labelledby={idHead}>
			<h3 id={idHead} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>

			<div className={cl.body}>{children}</div>
		</form>
	);
};

export default Subscription;

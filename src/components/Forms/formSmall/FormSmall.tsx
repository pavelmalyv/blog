import classNames from 'classnames';
import cl from './FormSmall.module.scss';

import { useId } from 'react';

interface FormSmallProps {
	title: string;
	isHiddenTitle?: boolean;
	children: React.ReactNode;
	noValidate?: boolean;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FormSmall = ({
	title,
	isHiddenTitle = true,
	children,
	noValidate,
	onSubmit,
}: FormSmallProps) => {
	const headId = useId();

	return (
		<form className={cl.form} aria-labelledby={headId} onSubmit={onSubmit} noValidate={noValidate}>
			<h3 id={headId} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>
			{children}
		</form>
	);
};

export default FormSmall;

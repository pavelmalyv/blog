import cl from './Checkbox.module.scss';
import classNames from 'classnames';
import ErrorField from '@/components/UI/errorField/ErrorField';
import Icon from '@components/UI/icon/Icon';

import { forwardRef, useId } from 'react';

type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'> & {
	label: React.ReactNode;
	errorMessage?: string;
	center?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, errorMessage, center = false, className, ...props }, ref) => {
		const errorMessageId = useId();

		return (
			<div className={classNames(cl.wrapper, { [cl['wrapper_center']]: center })}>
				<label className={cl.label}>
					<input ref={ref} type="checkbox" className={classNames(cl.field, className)} {...props} />
					<span className={cl.emulator}>
						<span className={cl['emulator-marker']}>
							<Icon>check</Icon>
						</span>
					</span>
					<span className={cl.description}>{label}</span>
				</label>
				<ErrorField id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default Checkbox;

import cl from './Field.module.scss';
import classNames from 'classnames';
import Icon from '@components/UI/icon/Icon';
import Label from '@components/UI/label/Label';
import ErrorField from '@/components/UI/errorField/ErrorField';

import { forwardRef, useId } from 'react';

type FieldProps = Omit<React.ComponentProps<'input'>, 'id' | 'aria-describedby'> & {
	icon?: string;
	label: string;
	isLabelHidden?: boolean;
	isLoading?: boolean;
	errorMessage?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
	(
		{ icon, label, isLabelHidden = false, isLoading = false, errorMessage, className, ...props },
		ref,
	) => {
		const fieldId = useId();
		const errorMessageId = useId();

		return (
			<div className={cl.wrapper}>
				<Label htmlFor={fieldId} isLabelHidden={isLabelHidden}>
					{label}
				</Label>
				<div className={cl['field-wrapper']}>
					<input
						ref={ref}
						id={fieldId}
						className={classNames(cl.field, { [cl['field_icon']]: icon }, className)}
						aria-describedby={errorMessageId}
						{...props}
					/>
					<div className={cl.icon}>
						{isLoading ? <div className={cl.spinner}></div> : <Icon>{icon}</Icon>}
					</div>
				</div>
				<ErrorField id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default Field;

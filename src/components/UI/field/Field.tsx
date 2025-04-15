import cl from './Field.module.scss';
import classNames from 'classnames';
import Icon from '@components/UI/icon/Icon';
import Label from '@components/UI/label/Label';
import ErrorField from '@/components/UI/errorField/ErrorField';

import { forwardRef, useId } from 'react';

interface FieldProps {
	label: string;
	isLabelHidden?: boolean;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	icon?: string;
	maxLength?: number;
	isLoading?: boolean;
	errorMessage?: string;
	autoComplete?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	'aria-controls'?: string;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
	(
		{
			label,
			isLabelHidden = false,
			type = 'text',
			name,
			placeholder,
			value,
			disabled,
			icon,
			maxLength,
			isLoading = false,
			errorMessage,
			autoComplete,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
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
						className={classNames(cl.field, { [cl['field_icon']]: icon })}
						type={type}
						name={name}
						placeholder={placeholder}
						value={value}
						disabled={disabled}
						maxLength={maxLength}
						onChange={onChange}
						onBlur={onBlur}
						autoComplete={autoComplete}
						aria-controls={ariaControls}
						aria-invalid={ariaInvalid}
						aria-describedby={errorMessageId}
						aria-required={ariaRequired}
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

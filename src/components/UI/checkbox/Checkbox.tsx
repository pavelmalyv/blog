import cl from './Checkbox.module.scss';
import FieldError from '../fieldError/FieldError';
import Icon from '../icon/Icon';

import { forwardRef, useId } from 'react';

interface CheckboxProps {
	label: React.ReactNode;
	name?: string;
	value?: boolean;
	disabled?: boolean;
	errorMessage?: string;
	autoComplete?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	'aria-controls'?: string;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			label,
			name,
			value,
			disabled,
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
		const idErrorMessage = useId();

		return (
			<div className={cl.wrapper}>
				<label className={cl.label}>
					<input
						ref={ref}
						type="checkbox"
						className={cl.field}
						name={name}
						value={String(value)}
						disabled={disabled}
						autoComplete={autoComplete}
						onChange={onChange}
						onBlur={onBlur}
						aria-controls={ariaControls}
						aria-invalid={ariaInvalid}
						aria-required={ariaRequired}
					/>
					<span className={cl.emulator}>
						<span className={cl['emulator-marker']}>
							<Icon>check</Icon>
						</span>
					</span>
					<span className={cl.description}>{label}</span>
				</label>
				<FieldError id={idErrorMessage} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default Checkbox;

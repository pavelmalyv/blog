import cl from './Field.module.scss';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Label from '../label/Label';
import { useId } from 'react';

interface FieldProps {
	label: string;
	isLabelHidden?: boolean;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	icon?: string;
	maxLength?: number;
	isLoading?: boolean;
	'aria-controls'?: string;
}

const Field = ({
	label,
	isLabelHidden = false,
	type = 'text',
	name,
	placeholder,
	value,
	disabled = false,
	onChange,
	icon,
	maxLength,
	isLoading = false,
	'aria-controls': ariaControls,
}: FieldProps) => {
	const idField = useId();

	return (
		<div>
			<Label htmlFor={idField} isLabelHidden={isLabelHidden}>
				{label}
			</Label>
			<div className={cl['field-wrapper']}>
				<input
					id={idField}
					className={classNames(cl.field, { [cl['field_icon']]: icon })}
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					disabled={disabled}
					onChange={onChange}
					maxLength={maxLength}
					aria-controls={ariaControls}
				/>
				<div className={cl.icon}>
					{isLoading ? <div className={cl.spinner}></div> : <Icon>{icon}</Icon>}
				</div>
			</div>
		</div>
	);
};

export default Field;

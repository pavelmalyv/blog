import { useId } from 'react';
import cl from './Field.module.scss';
import classNames from 'classnames';
import Icon from '../icon/Icon';

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
}: FieldProps) => {
	const idField = useId();

	return (
		<div>
			<label
				htmlFor={idField}
				className={classNames(cl.label, { 'visually-hidden': isLabelHidden })}
			>
				{label}
			</label>
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
				/>
				<div className={cl.icon}>
					{isLoading ? <div className={cl.spinner}></div> : <Icon>{icon}</Icon>}
				</div>
			</div>
		</div>
	);
};

export default Field;

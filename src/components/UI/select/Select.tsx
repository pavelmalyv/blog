import Label from '../label/Label';
import cl from './Select.module.scss';
import Icon from '../icon/Icon';
import { useId } from 'react';

interface SelectProps {
	children: React.ReactNode;
	label: string;
	isLabelHidden?: boolean;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	value?: string;
	'aria-controls'?: string;
}

const Select = ({
	label,
	isLabelHidden,
	children,
	onChange,
	value,
	'aria-controls': ariaControls,
}: SelectProps) => {
	const selectId = useId();

	return (
		<div>
			<Label htmlFor={selectId} isLabelHidden={isLabelHidden}>
				{label}
			</Label>
			<div className={cl.body}>
				<select
					id={selectId}
					className={cl.select}
					value={value}
					onChange={onChange}
					aria-controls={ariaControls}
				>
					{children}
				</select>
				<div className={cl.icon}>
					<Icon>keyboard_arrow_down</Icon>
				</div>
			</div>
		</div>
	);
};

interface OptionProps {
	children: React.ReactNode;
	value?: string;
}

const Option = ({ children, value }: OptionProps) => {
	return <option value={value}>{children}</option>;
};

Select.Option = Option;

export default Select;

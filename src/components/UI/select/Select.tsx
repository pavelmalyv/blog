import { useId } from 'react';
import Label from '../label/Label';
import cl from './Select.module.scss';
import Icon from '../icon/Icon';

interface SelectProps {
	children: React.ReactNode;
	label: string;
	isLabelHidden?: boolean;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	value?: string;
}

const Select = ({ label, isLabelHidden, children, onChange, value }: SelectProps) => {
	const idSelect = useId();

	return (
		<div>
			<Label htmlFor={idSelect} isLabelHidden={isLabelHidden}>
				{label}
			</Label>
			<div className={cl.body}>
				<select id={idSelect} className={cl.select} value={value} onChange={onChange}>
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

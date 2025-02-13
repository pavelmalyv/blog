import { useId } from 'react';
import Label from '../label/Label';
import cl from './Select.module.scss';
import Icon from '../icon/Icon';
import classNames from 'classnames';

interface SelectProps {
	children: React.ReactNode;
	label: string;
	isLabelHidden?: boolean;
	size?: 'small' | 'medium';
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	value?: string;
}

const Select = ({
	label,
	isLabelHidden,
	children,
	size = 'medium',
	onChange,
	value,
}: SelectProps) => {
	const idSelect = useId();

	return (
		<div className={classNames(cl.wrapper, cl[`wrapper_${size}`])}>
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

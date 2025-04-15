import cl from './Select.module.scss';
import classNames from 'classnames';
import Label from '@components/UI/label/Label';
import Icon from '@components/UI/icon/Icon';
import { useId } from 'react';

type SelectProps = Omit<React.ComponentProps<'select'>, 'id'> & {
	label: string;
	isLabelHidden?: boolean;
};

const Select = ({ label, isLabelHidden, className, children, ...props }: SelectProps) => {
	const selectId = useId();

	return (
		<div>
			<Label htmlFor={selectId} isLabelHidden={isLabelHidden}>
				{label}
			</Label>
			<div className={cl.body}>
				<select id={selectId} className={classNames(cl.select, className)} {...props}>
					{children}
				</select>
				<div className={cl.icon}>
					<Icon>keyboard_arrow_down</Icon>
				</div>
			</div>
		</div>
	);
};

type OptionProps = React.ComponentProps<'option'> & {
	children: React.ReactNode;
};

const Option = ({ children, ...props }: OptionProps) => {
	return <option {...props}>{children}</option>;
};

Select.Option = Option;

export default Select;

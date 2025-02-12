import { useId } from 'react';
import cl from './Search.module.scss';
import classNames from 'classnames';
import Field from '../../UI/field/Field';

interface SearchProps {
	title: string;
	isHiddenTitle?: boolean;
	labelField: string;
	name?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	maxLength?: number;
}

const Search = ({
	title,
	isHiddenTitle = true,
	labelField,
	name = 'search',
	placeholder,
	value,
	disabled,
	onChange,
	maxLength,
}: SearchProps) => {
	const idHead = useId();

	return (
		<form role="search" className={cl.search} aria-labelledby={idHead}>
			<h3 id={idHead} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>
			<Field
				type="search"
				icon="search"
				name={name}
				value={value}
				disabled={disabled}
				label={labelField}
				onChange={onChange}
				placeholder={placeholder}
				maxLength={maxLength}
			/>
		</form>
	);
};

export default Search;

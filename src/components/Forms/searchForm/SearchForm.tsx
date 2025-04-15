import { useId } from 'react';
import cl from './SearchForm.module.scss';
import classNames from 'classnames';

interface SearchFormProps {
	title: string;
	isHiddenTitle?: boolean;
	children: React.ReactNode;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SearchForm = ({ title, isHiddenTitle = true, children, onSubmit }: SearchFormProps) => {
	const headId = useId();

	return (
		<form role="search" className={cl.search} aria-labelledby={headId} onSubmit={onSubmit}>
			<h3 id={headId} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>
			{children}
		</form>
	);
};

export default SearchForm;

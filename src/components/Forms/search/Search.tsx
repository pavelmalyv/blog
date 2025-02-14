import { useId } from 'react';
import cl from './Search.module.scss';
import classNames from 'classnames';

interface SearchProps {
	title: string;
	isHiddenTitle?: boolean;
	children: React.ReactNode;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Search = ({ title, isHiddenTitle = true, children, onSubmit }: SearchProps) => {
	const idHead = useId();

	return (
		<form role="search" className={cl.search} aria-labelledby={idHead} onSubmit={onSubmit}>
			<h3 id={idHead} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>
			{children}
		</form>
	);
};

export default Search;

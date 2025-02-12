import React, { useId } from 'react';
import cl from './Search.module.scss';
import classNames from 'classnames';

interface SearchProps {
	title: string;
	isHiddenTitle?: boolean;
	children: React.ReactNode;
}

const Search = ({ title, isHiddenTitle = true, children }: SearchProps) => {
	const idHead = useId();

	return (
		<form role="search" className={cl.search} aria-labelledby={idHead}>
			<h3 id={idHead} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>
			{children}
		</form>
	);
};

export default Search;

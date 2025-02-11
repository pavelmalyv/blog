import { useId } from 'react';
import cl from './Search.module.scss';
import classNames from 'classnames';

interface SearchProps {
	title: string;
	isHiddenTitle?: boolean;
}

const Search = ({ title, isHiddenTitle = true }: SearchProps) => {
	const idHead = useId();

	return (
		<form role="search" className={cl.search} aria-labelledby={idHead}>
			<h3 id={idHead} className={classNames({ 'visually-hidden': isHiddenTitle })}>
				{title}
			</h3>
		</form>
	);
};

export default Search;

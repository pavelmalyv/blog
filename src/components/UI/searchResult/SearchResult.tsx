import classNames from 'classnames';
import cl from './SearchResult.module.scss';
import { MESSAGES } from '@/constants/messages';

interface SearchResultProps {
	field: string;
	lastQuery: string | null | undefined;
	total: number | undefined;
}

const SearchResult = ({ field, lastQuery, total }: SearchResultProps) => {
	return (
		<>
			{field.length > 0 && lastQuery && total ? (
				<div className={classNames(cl.result, 'h4')}>{MESSAGES.postsFound(lastQuery, total)}</div>
			) : null}
		</>
	);
};

export default SearchResult;

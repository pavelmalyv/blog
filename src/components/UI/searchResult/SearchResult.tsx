import classNames from 'classnames';
import cl from './SearchResult.module.scss';
import { MESSAGES } from '../../../constants/messages';

interface SearchResultProps {
	field: string;
	lastQuery: string | null | undefined;
	total: number;
}

const SearchResult = ({ field, lastQuery, total }: SearchResultProps) => {
	return (
		<>
			{field.length > 0 && lastQuery && (
				<div className={classNames(cl.result, 'h4')}>{MESSAGES.postsFound(lastQuery, total)}</div>
			)}
		</>
	);
};

export default SearchResult;

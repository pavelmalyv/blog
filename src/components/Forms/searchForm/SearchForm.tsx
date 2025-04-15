import cl from './SearchForm.module.scss';
import classNames from 'classnames';

type SearchFormProps = React.ComponentProps<'form'> & {
	children: React.ReactNode;
};

const SearchForm = ({ children, className, ...props }: SearchFormProps) => {
	return (
		<form role="search" className={classNames(cl.search, className)} {...props}>
			{children}
		</form>
	);
};

export default SearchForm;

import cl from './Filter.module.scss';

interface FilterProps {
	children: React.ReactNode;
}

const Filter = ({ children }: FilterProps) => {
	return <div className={cl.filter}>{children}</div>;
};

export default Filter;

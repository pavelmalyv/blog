import cl from './Filter.module.scss';

interface FilterProps {
	children: React.ReactNode;
}

const Filter = ({ children }: FilterProps) => {
	return <div className={cl.filter}>{children}</div>;
};

interface ItemProps {
	children: React.ReactNode;
}

const Item = ({ children }: ItemProps) => {
	return <div className={cl.item}>{children}</div>;
};

Filter.Item = Item;

export default Filter;

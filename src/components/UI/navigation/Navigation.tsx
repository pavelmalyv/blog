import { NavLink } from 'react-router';
import cl from './Navigation.module.scss';
import classNames from 'classnames';

interface NavigationProps {
	children: React.ReactNode;
	direction?: 'horizontal' | 'vertical';
}

const Navigation = ({ children, direction = 'horizontal' }: NavigationProps) => {
	const classesList = classNames(cl.list, {
		[cl['list-vertical']]: direction === 'vertical',
	});

	return (
		<nav className={cl.navigation}>
			<ul className={classesList}>{children}</ul>
		</nav>
	);
};

interface ItemProps {
	to: string;
	target?: string;
	children: React.ReactNode;
}

const Item = ({ to, target = '_self', children }: ItemProps) => {
	return (
		<li className={cl.item}>
			<NavLink to={to} target={target} className={cl.link}>
				{children}
			</NavLink>
		</li>
	);
};

Navigation.Item = Item;

export default Navigation;

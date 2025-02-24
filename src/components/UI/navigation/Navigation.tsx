import cl from './Navigation.module.scss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router';

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
	isActive?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Item = ({ to, target = '_self', isActive, children, onClick }: ItemProps) => {
	return (
		<li className={cl.item}>
			{isActive === undefined ? (
				<NavLink to={to} target={target} className={cl.link} onClick={onClick}>
					{children}
				</NavLink>
			) : (
				<Link
					to={to}
					target={target}
					aria-current={isActive ? 'page' : undefined}
					className={cl.link}
					onClick={onClick}
				>
					{children}
				</Link>
			)}
		</li>
	);
};

Navigation.Item = Item;

export default Navigation;

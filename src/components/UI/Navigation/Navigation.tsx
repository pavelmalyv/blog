import { NavLink } from 'react-router';
import cl from './Navigation.module.scss';
import classNames from 'classnames';

interface Link {
	to: string;
	text: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
}

interface NavigationProps {
	links: Link[];
	direction?: 'horizontal' | 'vertical';
}

const Navigation = ({ links, direction = 'horizontal' }: NavigationProps) => {
	const classesList = classNames(cl.list, {
		[cl['list-vertical']]: direction === 'vertical',
	});

	return (
		<nav className={cl.navigation}>
			<ul className={classesList}>
				{links.map((link) => (
					<li className={cl.item} key={link.to + link.text}>
						<NavLink to={link.to} target={link.target ?? '_self'} className={cl.link}>
							{link.text}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;

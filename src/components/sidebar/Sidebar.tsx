import classNames from 'classnames';
import cl from './Sidebar.module.scss';
import { useId } from 'react';

interface SidebarProps {
	reverse?: boolean;
	children: React.ReactNode;
}

const Sidebar = ({ reverse = false, children }: SidebarProps) => {
	return (
		<div className="section">
			<div className="container">
				<div className={classNames(cl.sidebar, { [cl['sidebar_reverse']]: reverse })}>
					{children}
				</div>
			</div>
		</div>
	);
};

interface AsideProps {
	title: string;
	labelledby?: boolean;
	children: React.ReactNode;
}

const Aside = ({ title, labelledby = true, children }: AsideProps) => {
	const idAside = useId();
	const ariaLabelledby = labelledby ? idAside : undefined;

	return (
		<aside className={cl.aside} aria-labelledby={ariaLabelledby}>
			<h2 id={idAside} className={classNames('h2', cl.title)}>
				{title}
			</h2>

			{children}
		</aside>
	);
};

interface MainProps {
	children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
	return <div>{children}</div>;
};

Sidebar.Aside = Aside;
Sidebar.Main = Main;

export default Sidebar;

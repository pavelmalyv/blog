import { NavLink } from 'react-router';
import cl from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={cl.footer}>
			<div className="container">
				<div className={cl.body}>
					<small className={cl.copyright}>© 2025</small>
					<nav className={cl.nav}>
						<ul className={cl.list}>
							<li className={cl.item}>
								<NavLink to="/" className={cl.link}>
									Home
								</NavLink>
							</li>
							<li className={cl.item}>
								<NavLink to="/other" className={cl.link}>
									Newsletter
								</NavLink>
							</li>
							<li className={cl.item}>
								<NavLink to="/other" className={cl.link}>
									Privacy policy
								</NavLink>
							</li>
							<li className={cl.item}>
								<NavLink to="/other" className={cl.link}>
									Licenses
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

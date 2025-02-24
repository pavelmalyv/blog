import cl from './Footer.module.scss';

import { Link, NavLink } from 'react-router';
import { blogUrl, cookiesUrl, creditsUrl, newslettersUrl, policyUrl } from '@/routes/routes';
import { useActiveNav } from '@hooks/useActiveNav';

const Footer = () => {
	const isBlogActive = useActiveNav(blogUrl.base, blogUrl.pagination(''));

	return (
		<footer className={cl.footer}>
			<div className="container">
				<div className={cl.body}>
					<small className={cl.copyright}>© 2025</small>
					<nav className={cl.nav}>
						<ul className={cl.list}>
							<li className={cl.item}>
								<Link
									to={blogUrl.base}
									className={cl.link}
									aria-current={isBlogActive ? 'page' : undefined}
								>
									Home
								</Link>
							</li>
							<li className={cl.item}>
								<NavLink to={newslettersUrl} className={cl.link}>
									Newsletters
								</NavLink>
							</li>
							<li className={cl.item}>
								<NavLink to={policyUrl} className={cl.link}>
									Privacy Policy
								</NavLink>
							</li>
							<li className={cl.item}>
								<NavLink to={cookiesUrl} className={cl.link}>
									Cookies Policy
								</NavLink>
							</li>
							<li className={cl.item}>
								<NavLink to={creditsUrl} className={cl.link}>
									Credits
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

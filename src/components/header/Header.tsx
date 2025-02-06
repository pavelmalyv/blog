import cl from './Header.module.scss';
import Logo from '../UI/Logo/Logo';
import Navigation from '../UI/Navigation/Navigation';

const navigationLinks = [
	{
		to: '/',
		text: 'Home',
	},
	{
		to: '/other',
		text: 'Blog',
	},
	{
		to: '/other',
		text: 'Newsletter',
	},
];

const Header = () => {
	return (
		<>
			<header className={cl.header}>
				<div className="container container-full">
					<div className={cl.body}>
						<Logo />
						<div className={cl.panel}>
							<Navigation links={navigationLinks} />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

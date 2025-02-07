import cl from './Header.module.scss';
import Logo from '../UI/Logo/Logo';
import Navigation from '../UI/Navigation/Navigation';
import ThemeSwitch from '../UI/ThemeSwitch/ThemeSwitch';
import ButtonIcon from '../UI/ButtonIcon/ButtonIcon';

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
							<ThemeSwitch />
						</div>
						<div className={cl.burger}>
							<ButtonIcon icon="menu" hiddenName="Menu" />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

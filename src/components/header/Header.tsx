import cl from './Header.module.scss';
import Logo from '../UI/Logo/Logo';
import Modal from '../UI/Modal/Modal';
import Navigation from '../UI/Navigation/Navigation';
import ThemeSwitch from '../UI/ThemeSwitch/ThemeSwitch';
import ButtonIcon from '../UI/ButtonIcon/ButtonIcon';
import { useState } from 'react';

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
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	function handleMenuClose() {
		setIsOpenMenu(false);
	}

	function handleMenuOpen() {
		setIsOpenMenu(true);
	}

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
							<ButtonIcon icon="menu" hiddenName="Menu" onClick={handleMenuOpen} />
						</div>
					</div>
				</div>
			</header>

			<Modal isOpen={isOpenMenu} onClose={handleMenuClose} aria={{ label: 'Menu' }}>
				Modal
			</Modal>
		</>
	);
};

export default Header;

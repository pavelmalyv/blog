import cl from './Header.module.scss';
import Logo from '../UI/logo/Logo';
import Modal from '../UI/modal/Modal';
import Navigation from '../UI/navigation/Navigation';
import ThemeSwitch from '../UI/themeSwitch/ThemeSwitch';
import ButtonIcon from '../UI/buttonIcon/ButtonIcon';

import { useState } from 'react';
import { newslettersUrl } from '../../routes/routes';

const NavigationItems = () => {
	return (
		<>
			<Navigation.Item to="/">Home</Navigation.Item>
			<Navigation.Item to={newslettersUrl}>Newsletters</Navigation.Item>
		</>
	);
};

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
							<Navigation>
								<NavigationItems />
							</Navigation>
							<ThemeSwitch />
						</div>
						<div className={cl.burger}>
							<ButtonIcon icon="menu" hiddenName="Menu" onClick={handleMenuOpen} />
						</div>
					</div>
				</div>
			</header>

			<Modal isOpen={isOpenMenu} onClose={handleMenuClose} aria={{ label: 'Menu' }}>
				<div className={cl.menu}>
					<div className={cl['menu-wrapper']}>
						<div className={cl['menu-logo']}>
							<Logo />
						</div>
						<div className={cl['menu-navigation']}>
							<Navigation direction="vertical">
								<NavigationItems />
							</Navigation>
						</div>
						<ThemeSwitch />
						<div className={cl['menu-close']}>
							<ButtonIcon icon="close" hiddenName="Close" onClick={handleMenuClose} />
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Header;

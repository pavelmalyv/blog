import cl from './Header.module.scss';
import Logo from '../UI/Logo/Logo';

const Header = () => {
	return (
		<>
			<header className={cl.header}>
				<div className="container container-full">
					<div className={cl.body}>
						<Logo />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

import cl from './Logo.module.scss';
import { Link } from 'react-router';

const Logo = () => {
	return (
		<Link to="/" className={cl.logo}>
			Blog
		</Link>
	);
};

export default Logo;

import { Link } from 'react-router';
import cl from './Logo.module.scss';

const Logo = () => {
	return (
		<Link to="/" className={cl.logo}>
			Blog
		</Link>
	);
};

export default Logo;

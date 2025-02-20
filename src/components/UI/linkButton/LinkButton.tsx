import cl from './LinkButton.module.scss';
import { Link } from 'react-router';

interface LinkButtonProps {
	to: string;
	target?: string;
	children: React.ReactNode;
}

const LinkButton = ({ to, target, children }: LinkButtonProps) => {
	return (
		<Link to={to} target={target} className={cl.link}>
			{children}
		</Link>
	);
};

export default LinkButton;

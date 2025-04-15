import type { BaseButton } from '@/types/baseProps';
import { Link } from 'react-router';

const ButtonBase = ({ to, type, children, ...props }: BaseButton) => {
	return (
		<>
			{to !== undefined ? (
				<Link to={to} {...(props as React.ComponentProps<'a'>)}>
					{children}
				</Link>
			) : (
				<button type={type ?? 'button'} {...(props as React.ComponentProps<'button'>)}>
					{children}
				</button>
			)}
		</>
	);
};

export default ButtonBase;

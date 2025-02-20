import cl from './Button.module.scss';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type = 'button', disabled, children, onClick }: ButtonProps) => {
	return (
		<button type={type} disabled={disabled} className={cl.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;

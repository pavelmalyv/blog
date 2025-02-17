import cl from './Button.module.scss';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
}

const Button = ({ type = 'button', children }: ButtonProps) => {
	return (
		<button type={type} className={cl.button}>
			{children}
		</button>
	);
};

export default Button;

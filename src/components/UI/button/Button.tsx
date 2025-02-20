import classNames from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	mobileFull?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	type = 'button',
	mobileFull = false,
	disabled,
	children,
	onClick,
}: ButtonProps) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={classNames(cl.button, { [cl['button_mobile-full']]: mobileFull })}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;

import classNames from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	mobileFull?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
}

const Button = ({ type = 'button', mobileFull = false, disabled, children }: ButtonProps) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={classNames(cl.button, { [cl['button_mobile-full']]: mobileFull })}
		>
			{children}
		</button>
	);
};

export default Button;

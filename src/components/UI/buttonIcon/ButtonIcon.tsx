import Icon from '../icon/Icon';
import cl from './ButtonIcon.module.scss';

interface ButtonIconProps {
	type?: 'button' | 'submit' | 'reset';
	hiddenName: string;
	icon: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonIcon = ({ type = 'button', hiddenName, icon, onClick }: ButtonIconProps) => {
	return (
		<button type={type} className={cl.button} onClick={onClick}>
			<span className="visually-hidden">{hiddenName}</span>
			<Icon>{icon}</Icon>
		</button>
	);
};

export default ButtonIcon;

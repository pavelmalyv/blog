import Icon from '../icon/Icon';
import cl from './ButtonIcon.module.scss';

interface ButtonIconProps {
	hiddenName: string;
	icon: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonIcon = ({ hiddenName, icon, onClick }: ButtonIconProps) => {
	return (
		<button className={cl.button} onClick={onClick}>
			<span className="visually-hidden">{hiddenName}</span>
			<Icon>{icon}</Icon>
		</button>
	);
};

export default ButtonIcon;

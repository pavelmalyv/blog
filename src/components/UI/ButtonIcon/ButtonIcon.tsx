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
			<span className="material-symbols-outlined" aria-hidden="true">
				{icon}
			</span>
		</button>
	);
};

export default ButtonIcon;

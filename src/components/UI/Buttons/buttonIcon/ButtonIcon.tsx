import type { BaseButton } from '@/types/baseProps';

import cl from './ButtonIcon.module.scss';
import classNames from 'classnames';
import Icon from '../../icon/Icon';
import ButtonBase from '../buttonBase/ButtonBase';

type ButtonIconProps = BaseButton & {
	icon: string;
	hiddenName: string;
};

const ButtonIcon = ({ icon, hiddenName, className, children, ...props }: ButtonIconProps) => {
	return (
		<ButtonBase className={classNames(cl.button, className)} {...props}>
			<span className="visually-hidden">{hiddenName}</span>
			<Icon>{icon}</Icon>

			{children}
		</ButtonBase>
	);
};

export default ButtonIcon;

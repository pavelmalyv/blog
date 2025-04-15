import type { BaseButton } from '@/types/baseProps';

import cl from './Button.module.scss';
import classNames from 'classnames';
import ButtonBase from '../buttonBase/ButtonBase';

const Button = ({ className, ...props }: BaseButton) => {
	return <ButtonBase className={classNames(cl.button, className)} {...props} />;
};

export default Button;

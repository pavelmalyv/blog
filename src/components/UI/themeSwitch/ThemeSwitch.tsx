import cl from './ThemeSwitch.module.scss';
import { useState } from 'react';
import Icon from '../icon/Icon';

const ThemeSwitch = () => {
	const [dark, setDark] = useState(false);

	return (
		<button
			className={cl.switch}
			type="button"
			role="switch"
			aria-checked={dark}
			onClick={() => setDark((prev) => !prev)}
		>
			<span className="visually-hidden">Dark Mode</span>
			<span className={cl.icons} aria-hidden="true">
				<span className={cl.icon}>
					<Icon>wb_sunny</Icon>
				</span>
				<span className={cl.icon}>
					<Icon>bedtime</Icon>
				</span>
				<span className={cl.cursor}></span>
			</span>
		</button>
	);
};

export default ThemeSwitch;

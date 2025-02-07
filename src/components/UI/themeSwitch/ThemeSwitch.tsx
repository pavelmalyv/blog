import classNames from 'classnames';
import cl from './ThemeSwitch.module.scss';
import { useState } from 'react';

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
				<span className={classNames(cl.icon, 'material-symbols-outlined')}>wb_sunny</span>
				<span className={classNames(cl.icon, 'material-symbols-outlined')}>bedtime</span>
				<span className={cl.cursor}></span>
			</span>
		</button>
	);
};

export default ThemeSwitch;

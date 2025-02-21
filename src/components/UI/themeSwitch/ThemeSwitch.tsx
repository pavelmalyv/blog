import cl from './ThemeSwitch.module.scss';
import Icon from '../icon/Icon';

import { useTheme } from '../../../hooks/useTheme';
import { THEMES } from '../../../constants/theme';

const ThemeSwitch = () => {
	const [savedTheme, setSavedTheme] = useTheme();
	const isDark = savedTheme === THEMES.dark;

	const handleClick = () => {
		setSavedTheme(isDark ? THEMES.light : THEMES.dark);
	};

	return (
		<button
			className={cl.switch}
			type="button"
			role="switch"
			aria-checked={isDark}
			onClick={handleClick}
		>
			<span className="visually-hidden">Dark Mode</span>
			<span className={cl.icons} aria-hidden="true">
				<span className={cl.icon}>
					<Icon>wb_sunny</Icon>
				</span>
				<span className={cl.icon}>
					<Icon>bedtime</Icon>
				</span>
				{savedTheme && <span className={cl.cursor}></span>}
			</span>
		</button>
	);
};

export default ThemeSwitch;

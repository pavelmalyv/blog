import type { Themes } from '@/types/theme';

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSavedTheme, setSavedTheme } from '@/store/savedThemeSlice';
import { savedThemeSchema } from '@/schemas/themeSchemas';

import { THEMES } from '@/constants/theme';

const getSavedThemeStorage = async () => {
	const storage = localStorage.getItem('saved-theme');
	if (!storage) {
		return;
	}

	try {
		const savedThemeStorage = await savedThemeSchema.validate(storage);
		return savedThemeStorage;
	} catch (error) {
		console.error(error);
		console.error('The "saved-theme" value is incorrect. The local storage has been cleared');
		localStorage.removeItem('saved-theme');
	}
};

const getUserPrefersTheme = () => {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.dark : THEMES.light;
};

export const useTheme = () => {
	const [userPrefersTheme, setUserPrefersTheme] = useState<Themes | null>(null);
	const themeSelected = useAppSelector(selectSavedTheme);
	const currentTheme = themeSelected ?? userPrefersTheme;
	const dispatch = useAppDispatch();

	const setTheme = useCallback(
		(theme: Themes) => {
			dispatch(setSavedTheme(theme));
		},
		[dispatch],
	);

	useEffect(() => {
		(async () => {
			const savedThemeStorage = await getSavedThemeStorage();
			if (savedThemeStorage) {
				setTheme(savedThemeStorage);
				return;
			}

			setUserPrefersTheme(getUserPrefersTheme());
		})();
	}, [setTheme]);

	useEffect(() => {
		if (!themeSelected) {
			return;
		}

		localStorage.setItem('saved-theme', String(themeSelected));
	}, [themeSelected]);

	useEffect(() => {
		if (!currentTheme) {
			return;
		}

		document.documentElement.setAttribute('data-theme', currentTheme);
	}, [currentTheme]);

	return [currentTheme, setTheme] as const;
};

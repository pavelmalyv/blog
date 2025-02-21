import type { Themes } from '../types/theme';
import { string } from 'yup';
import { THEMES } from '../constants/theme';

export const savedThemeSchema = string()
	.oneOf(Object.keys(THEMES) as Array<Themes>)
	.defined()
	.required();

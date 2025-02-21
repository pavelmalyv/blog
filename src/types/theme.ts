import { THEMES } from '../constants/theme';

export type Themes = keyof typeof THEMES;
export type SavedThemes = Themes | null;

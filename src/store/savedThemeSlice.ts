import type { SavedThemes } from '../types/theme';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface ThemeSavedState {
	value: SavedThemes;
}

const initialState: ThemeSavedState = {
	value: null,
};

export const savedThemeSlice = createSlice({
	name: 'savedTheme',
	initialState,
	reducers: {
		setSavedTheme: (state, action: PayloadAction<SavedThemes>) => {
			state.value = action.payload;
		},
	},
});

export const selectSavedTheme = (state: RootState) => state.savedTheme.value;

export const { setSavedTheme } = savedThemeSlice.actions;
export const savedThemeReducer = savedThemeSlice.reducer;

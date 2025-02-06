import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		checker({
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
				useFlatConfig: true,
			},
			stylelint: {
				lintCommand: 'stylelint ./src/**/*.{css,scss}',
			},
		}),
		react(),
	],
});

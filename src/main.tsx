import App from '@/App.tsx';
import Modal from 'react-modal';
import ToastPortal from './components/toastPortal/ToastPortal';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { SkeletonTheme } from 'react-loading-skeleton';

import 'material-symbols';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@styles/base/index.scss';
import 'react-loading-skeleton/dist/skeleton.css';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<SkeletonTheme
				baseColor="rgb(var(--color-skeleton))"
				highlightColor="rgb(var(--color-skeleton-highlight))"
			>
				<App />
				<ToastPortal />
			</SkeletonTheme>
		</Provider>
	</StrictMode>,
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx';
import Modal from 'react-modal';

import 'material-symbols';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './styles/base/index.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<SkeletonTheme baseColor="rgb(244, 244, 244)" highlightColor="rgb(248, 248, 248)">
				<App />
			</SkeletonTheme>
		</Provider>
	</StrictMode>,
);

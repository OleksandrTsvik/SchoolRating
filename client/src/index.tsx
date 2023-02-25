import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/uk_UA';

import App from './features/app/App';
import { store } from './store';

import 'moment/locale/uk';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<ConfigProvider locale={locale}>
			<App />
		</ConfigProvider>
	</Provider>
);

import React from 'react';

import AppRouter from './AppRouter';
import AuthMiddleware from '../../utils/AuthMiddleware';

import './App.scss';
import './short-bootstrap.css';

export default function App() {
	return (
		<AuthMiddleware>
			<AppRouter />
		</AuthMiddleware>
	);
};

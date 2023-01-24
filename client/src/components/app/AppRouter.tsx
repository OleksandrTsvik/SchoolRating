import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AdminRoutes from '../admin/layout/AdminRoutes';

export default function AppRouter() {
	return (
		<Router>
			<AdminRoutes />
		</Router>
	);
}
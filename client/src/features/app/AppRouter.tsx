import { BrowserRouter as Router, Routes } from 'react-router-dom';

import AdminRoutes from '../admin-layout/AdminRoutes';
import UserRoutes from '../user-layout/UserRoutes';

export default function AppRouter() {
	return (
		<Router>
			<Routes>
				{AdminRoutes}
				{UserRoutes}
			</Routes>
		</Router>
	);
}
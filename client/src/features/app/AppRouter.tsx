import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminRoutes from '../admin-layout/AdminRoutes';
import UserRoutes from '../user-layout/UserRoutes';

export default function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="*" element={
					<>
						<AdminRoutes />
						<UserRoutes />
					</>
				} />
			</Routes>
		</Router>
	);
}
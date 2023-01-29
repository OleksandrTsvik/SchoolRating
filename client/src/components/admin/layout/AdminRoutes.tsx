import { Navigate, Route } from 'react-router-dom';

import {
	LoginPage,
	SubjectsPage,
	NotFoundPage,
	LogoutPage,
	SettingsPage
} from '../pages';
import { PrivateOutlet } from './PrivateOutlet';

export default (
	<>
		<Route path="admin/login" element={<LoginPage />} />
		<Route path="admin" element={<PrivateOutlet />}>
			<Route index element={<Navigate to="subjects" replace />} />
			<Route path="logout" element={<LogoutPage />} />
			<Route path="subjects" element={<SubjectsPage />} />
			<Route path="settings" element={<SettingsPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>
	</>
);
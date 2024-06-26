import { Navigate, Route, Routes } from 'react-router-dom';

import {
	LoginPage,
	SubjectsPage,
	NotFoundPage,
	LogoutPage,
	SettingsPage,
	UsersPage,
	ClassesPage,
	ClassStudentsPage,
	EducationsPage
} from '../admin-pages';
import { PrivateOutlet } from './PrivateOutlet';

export default function AdminRoutes() {
	return (
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route element={<PrivateOutlet />}>
				<Route index element={<Navigate to="settings" replace />} />
				<Route path="logout" element={<LogoutPage />} />
				<Route path="subjects" element={<SubjectsPage />} />
				<Route path="classes">
					<Route index element={<ClassesPage />} />
					<Route path=":id/students" element={<ClassStudentsPage />} />
				</Route>
				<Route path="educations" element={<EducationsPage />} />
				<Route path="settings" element={<SettingsPage />} />
				<Route path="users" element={<UsersPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}
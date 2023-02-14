import { Navigate, Route } from 'react-router-dom';

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

export default (
	<>
		<Route path="admin/login" element={<LoginPage />} />
		<Route path="admin" element={<PrivateOutlet />}>
			<Route index element={<Navigate to="subjects" replace />} />
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
	</>
);
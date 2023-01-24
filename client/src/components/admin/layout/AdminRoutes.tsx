import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
	LoginPage,
	SubjectsPage,
	NotFoundPage,
	LogoutPage
} from '../pages';
import { PrivateOutlet } from './PrivateOutlet';

export default function AdminRoutes() {
	return (
		<Routes>
			<Route path="admin/login" element={<LoginPage />} />
			<Route path="admin" element={<PrivateOutlet />}>
				<Route index element={<Navigate to="subjects" />} />
				<Route path="logout" element={<LogoutPage />} />
				<Route path="subjects" element={<SubjectsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}
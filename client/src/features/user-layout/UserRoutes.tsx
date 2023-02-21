import { Route, Routes } from 'react-router-dom';

import {
	HomePage,
	NotFoundPage,
	LoginPage,
	RegisterPage,
	LayoutPage,
	LogoutPage,
	CabinetPage,
	DiaryPage,
	GradebooksPage,
	GradebookPage
} from '../user-pages';
import { PrivateOutlet } from './PrivateOutlet';
import { NoAuthOutlet } from './NoAuthOutlet';
import useUserAuth from '../../hooks/useUserAuth';

export default function UserRoutes() {
	const { isStudent, isTeacher } = useUserAuth();

	return (
		<Routes>
			<Route element={<PrivateOutlet />}>
				<Route path="logout" element={<LogoutPage />} />
				<Route path="cabinet" element={<CabinetPage />} />
				{isStudent && <Route path="diary" element={<DiaryPage />} />}
				{isTeacher &&
					<>
						<Route path="gradebooks" element={<GradebooksPage />} />
						<Route path="gradebook/:id" element={<GradebookPage />} />
					</>
				}
			</Route>
			<Route element={<NoAuthOutlet />}>
				<Route path="login/*" element={<LoginPage />} />
				<Route path="register/*" element={<RegisterPage />} />
			</Route>
			<Route element={<LayoutPage />}>
				<Route index element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}
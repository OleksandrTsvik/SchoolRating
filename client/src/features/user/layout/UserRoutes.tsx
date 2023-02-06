import { Route } from 'react-router-dom';

import { HomePage, NotFoundPage, LoginPage, RegisterPage, LayoutPage, LogoutPage } from '../pages';
import { PrivateOutlet } from './PrivateOutlet';
import { NoAuthOutlet } from './NoAuthOutlet';

export default (
	<>
		<Route path="/">
			<Route element={<PrivateOutlet />}>
				<Route path="logout" element={<LogoutPage />} />
				<Route path="cabinet" element={<>Cabinet</>} />
			</Route>
			<Route element={<NoAuthOutlet />}>
				<Route path="login/*" element={<LoginPage />} />
				<Route path="register/*" element={<RegisterPage />} />
			</Route>
			<Route element={<LayoutPage />}>
				<Route index element={<HomePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Route>
	</>
);
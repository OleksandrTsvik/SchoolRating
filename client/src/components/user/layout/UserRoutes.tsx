import { Route } from 'react-router-dom';

import { LayoutPage, HomePage, NotFoundPage } from '../pages';

export default (
	<>
		<Route path="/" element={<LayoutPage />}>
			<Route index element={<HomePage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>
	</>
);
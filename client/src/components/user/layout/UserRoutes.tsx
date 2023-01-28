import { Route } from 'react-router-dom';

import { LayoutPage, HomePage } from '../pages';

export default (
	<>
		<Route path="/" element={<LayoutPage />}>
			<Route index element={<HomePage />} />
		</Route>
	</>
);
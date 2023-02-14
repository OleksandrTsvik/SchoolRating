import { Outlet } from 'react-router-dom';

import UserFooter from '../../user-layout/UserFooter';
import UserNavbar from '../../user-layout/UserNavbar';
import UserMain from '../../user-layout/UserMain';

import styles from './LayoutPage.module.scss';

export default function LayoutPage() {
	return (
		<div className={styles.wrapper}>
			<UserNavbar />
			<UserMain>
				<Outlet />
			</UserMain>
			<UserFooter />
		</div>
	);
}
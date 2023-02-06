import { Outlet } from 'react-router-dom';

import UserFooter from '../../layout/UserFooter';
import UserNavbar from '../../layout/UserNavbar';
import UserMain from '../../layout/UserMain';

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
import { Outlet } from 'react-router-dom';

import UserFooter from '../../layout/footer/UserFooter';
import UserNavbar from '../../layout/navbar/UserNavbar';
import UserMain from '../../layout/main/UserMain';

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
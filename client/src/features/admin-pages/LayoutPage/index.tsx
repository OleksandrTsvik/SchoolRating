import React from 'react';
import Layout from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import AdminFooter from '../../admin-layout/AdminFooter';
import AdminSider from '../../admin-layout/AdminSider';
import AdminMain from '../../admin-layout/AdminMain';

import styles from './LayoutPage.module.scss';

export default function LayoutPage() {
	return (
		<Layout className={styles.admin}>
			<AdminSider />

			<Layout className="site-layout">
				<AdminMain>
					<Outlet />
				</AdminMain>
				<AdminFooter />
			</Layout>
		</Layout>
	);
};
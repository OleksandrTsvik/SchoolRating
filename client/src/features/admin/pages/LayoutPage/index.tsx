import React from 'react';
import Layout from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import AdminFooter from '../../layout/AdminFooter';
import AdminSider from '../../layout/AdminSider';
import AdminMain from '../../layout/AdminMain';

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
import React from 'react';
import Layout from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import AdminFooter from '../footer/AdminFooter';
import AdminSider from '../sider/AdminSider';
import Main from '../main/Main';

import styles from './LayoutPage.module.scss';

export default function LayoutPage() {
	return (
		<Layout className={styles.admin}>
			<AdminSider />

			<Layout className="site-layout">
				<Main>
					<Outlet />
				</Main>
				<AdminFooter />
			</Layout>
		</Layout>
	);
};
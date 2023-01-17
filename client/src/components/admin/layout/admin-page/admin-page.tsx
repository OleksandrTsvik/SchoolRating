import React from 'react';
import Layout from 'antd/es/layout/layout';

import AdminFooter from '../footer/admin-footer';
import AdminSider from '../sider/admin-sider';
import Main from '../main/main';

export default function AdminPage() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<AdminSider />

			<Layout className="site-layout">
				<Main />
				<AdminFooter />
			</Layout>

		</Layout>
	);
};
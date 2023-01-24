import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { CloudOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

import { items } from './menu-items';

import styles from './AdminSider.module.scss';

export default function AdminSider() {
	const [collapsed, setCollapsed] = useState(!!localStorage.getItem('adminSider'));
	const navigate = useNavigate();

	function onCollapseSider(value: boolean) {
		if (value) {
			localStorage.setItem('adminSider', `${value}`);
		} else {
			localStorage.removeItem('adminSider');
		}

		setCollapsed(value);
	}

	return (
		<Sider
			className={styles.antLayoutSider}
			width={250}
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapseSider}
		>
			<div className={styles.siderWrapper}>
				<div className={styles.siderHeader}>
					{collapsed
						? <CloudOutlined />
						: 'School'
					}
				</div>
				<Menu
					theme="dark"
					mode="inline"
					items={items}
					onClick={({ key }) => navigate(key)}
					selectedKeys={[window.location.pathname]}
				/>
			</div>
		</Sider>
	);
}
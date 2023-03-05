import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { CloudOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

import { items } from './menu-items';

import styles from './AdminSider.module.scss';

export default function AdminSider() {
	const [collapsed, setCollapsed] = useState(!!localStorage.getItem('adminSider'));
	const location = useLocation();

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
				<Link
					to="/"
					className={styles.siderHeader}
				>
					{collapsed
						? <CloudOutlined />
						: 'Рейтинг'
					}
				</Link>
				<Menu
					theme="dark"
					mode="inline"
					items={items}
					selectedKeys={[location.pathname]}
				/>
			</div>
		</Sider>
	);
}
import React, { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { CloudOutlined } from '@ant-design/icons';

import { items } from './menu-items';

import styles from './admin-sider.module.scss';

export default function AdminSider() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Sider
			className={styles.antLayoutSider}
			width={250}
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
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
					defaultSelectedKeys={['1']}
					mode="inline"
					items={items}
				/>
			</div>
		</Sider>
	);
}
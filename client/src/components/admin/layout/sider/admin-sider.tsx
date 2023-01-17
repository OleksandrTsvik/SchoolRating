import React, { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { CloudOutlined } from '@ant-design/icons';

import { items } from './menu-items';

import './admin-sider.css';

export default function AdminSider() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Sider
			width={250}
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
		>
			<div className="sider-wrapper">
				<div className="sider-header">
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
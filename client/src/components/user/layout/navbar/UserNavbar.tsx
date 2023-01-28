import { useState } from 'react';
import { Drawer } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { BarsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import MenuNavbar from './MenuNavbar';
import { itemsLeftMenu, itemsRightMenu } from './menu-items';

import styles from './UserNavbar.module.scss';

export default function UserNavbar() {
	const [visible, setVisible] = useState(false);

	function onCloseDrawer() {
		setVisible(false);
	}

	return (
		<Header className={styles.header}>
			<div className="container d-flex align-items-center">
				<Link
					className={styles.logo}
					to="/"
				>
					Рейтинг
				</Link>
				<div className={styles.menuContainer}>
					<MenuNavbar
						theme={'dark'}
						mode={'horizontal'}
						items={itemsLeftMenu}
					/>
					<MenuNavbar
						theme={'dark'}
						mode={'horizontal'}
						items={itemsRightMenu}
					/>
				</div>
				<button
					className={styles.btnBars}
					onClick={() => setVisible(true)}
				>
					<BarsOutlined />
				</button>
			</div>
			<Drawer
				title="Rating"
				placement="right"
				onClose={onCloseDrawer}
				open={visible}
			>
				<MenuNavbar
					theme={'light'}
					mode={'inline'}
					items={[...itemsLeftMenu, ...itemsRightMenu]}
					onCloseDrawer={onCloseDrawer}
				/>
			</Drawer>
		</Header>
	);
}
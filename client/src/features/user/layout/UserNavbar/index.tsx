import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { BarsOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { useAppSelector } from '../../../../store';
import { selectCurrentUser } from '../../../../api/auth/user/authUserSlice';
import MenuNavbar from './MenuNavbar';
import { HomeItemType, itemsLeftMenu, itemsRightMenu } from './menu-items';

import styles from './UserNavbar.module.scss';

export default function UserNavbar() {
	const user = useAppSelector(selectCurrentUser);
	const [visible, setVisible] = useState(false);

	// eslint-disable-next-line
	const itemsLeft = useMemo(() => itemsFilter(itemsLeftMenu), [user]);
	// eslint-disable-next-line
	const itemsRight = useMemo(() => itemsFilter(itemsRightMenu), [user]);

	function itemsFilter(items: HomeItemType[]): ItemType[] {
		const itemsFilter = user
			? items.filter(item => item.rolesAccess?.length === 0 || item.rolesAccess?.includes(user.role))
			: items.filter(item => item.rolesAccess?.length === 0);

		return itemsFilter.map(item => {
			const { rolesAccess, ...newItem } = item;
			return newItem as ItemType;
		});
	}

	function onCloseDrawer() {
		setVisible(false);
	}

	return (
		<Header className={styles.header}>
			<div className={`container ${styles.wrapper}`}>
				<Link className={styles.logo} to="/">
					Рейтинг
				</Link>
				<div className={styles.menuContainer}>
					<MenuNavbar
						theme={'dark'}
						mode={'horizontal'}
						items={itemsLeft}
					/>
					<MenuNavbar
						theme={'dark'}
						mode={'horizontal'}
						items={itemsRight}
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
					items={[...itemsLeft, ...itemsRight]}
					onCloseDrawer={onCloseDrawer}
				/>
			</Drawer>
		</Header>
	);
}
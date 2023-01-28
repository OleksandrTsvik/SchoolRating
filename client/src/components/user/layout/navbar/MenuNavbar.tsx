import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useLocation } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { HomeItemType } from './menu-items';
import { useAppSelector } from '../../../../store';
import { selectCurrentUser } from '../../../../api/auth/user/authUserSlice';

interface Props {
	theme: 'light' | 'dark';
	mode: 'horizontal' | 'vertical' | 'inline';
	items: HomeItemType[];
	onCloseDrawer?: () => void;
}

export default function MenuNavbar({ theme, mode, items, onCloseDrawer }: Props) {
	const user = useAppSelector(selectCurrentUser);
	const location = useLocation();

	function onClickItem(info: MenuInfo) {
		if (onCloseDrawer) {
			onCloseDrawer();
		}
	}

	return (
		<Menu
			theme={theme}
			mode={mode}
			disabledOverflow={true}
			items={
				(user
					? items.filter(item => item.rolesAccess?.includes(user.role))
					: items.filter(item => item.rolesAccess?.length === 0))
					.map(item => {
						const { rolesAccess, ...newItem } = item;
						return newItem as ItemType;
					})
			}
			onClick={onClickItem}
			selectedKeys={[location.pathname]}
		/>
	);
}
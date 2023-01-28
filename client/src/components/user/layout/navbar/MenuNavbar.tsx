import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useNavigate } from 'react-router-dom';

import { HomeItemType } from './menu-items';

interface Props {
	theme: 'light' | 'dark';
	mode: 'horizontal' | 'vertical' | 'inline';
	items: HomeItemType[];
	onCloseDrawer?: () => void;
}

export default function MenuNavbar({ theme, mode, items, onCloseDrawer }: Props) {
	const navigate = useNavigate();

	function onClickItem(info: MenuInfo) {
		if (onCloseDrawer) {
			onCloseDrawer();
		}

		navigate(info.key);
	}

	return (
		<Menu
			theme={theme}
			mode={mode}
			disabledOverflow={true}
			items={items}
			onClick={onClickItem}
			selectedKeys={[window.location.pathname]}
		/>
	);
}
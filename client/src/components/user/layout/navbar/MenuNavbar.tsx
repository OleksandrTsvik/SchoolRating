import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useLocation } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';

interface Props {
	theme: 'light' | 'dark';
	mode: 'horizontal' | 'vertical' | 'inline';
	items: ItemType[];
	onCloseDrawer?: () => void;
}

export default function MenuNavbar({ theme, mode, items, onCloseDrawer }: Props) {
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
			items={items}
			onClick={onClickItem}
			selectedKeys={[location.pathname]}
		/>
	);
}
import React from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { LogoutOutlined } from '@ant-design/icons';

import { Role } from '../../../../api/auth/role.enum';

export type HomeItemType = ItemType & {
	rolesAccess?: Role[]
};

function getItem(
	url: string,
	label: React.ReactNode,
	icon?: React.ReactNode,
	rolesAccess: Role[] = [],
	className: string = 'px-3 py-2'
): HomeItemType {
	return {
		key: url,
		label,
		icon,
		className
	};
}

export const itemsLeftMenu: HomeItemType[] = [
	getItem('/', 'Головна')
];

export const itemsRightMenu: HomeItemType[] = [
	getItem('/cabinet', 'Особистий кабінет'),
	getItem('/logout', 'Вийти', <LogoutOutlined />, [Role.Student, Role.Teacher])
];
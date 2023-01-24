import React from 'react';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import {
	AreaChartOutlined,
	BookOutlined,
	TeamOutlined,
	BankOutlined,
	UserOutlined,
	SettingOutlined,
	LogoutOutlined,
} from '@ant-design/icons';

function getKey(url: string): React.Key {
	return `/admin${url}`;
}

export const items: ItemType[] = [
	{ key: getKey('/statistics'), label: 'Статистика', icon: <AreaChartOutlined /> },
	{ key: getKey('/subjects'), label: 'Предмети', icon: <BookOutlined /> },
	{ key: getKey('/classes'), label: 'Класи', icon: <TeamOutlined /> },
	{ key: getKey('/educations'), label: 'Викладання предметів', icon: <BankOutlined /> },
	{ key: getKey('/users'), label: 'Користувачі', icon: <UserOutlined /> },
	{ key: getKey('/settings'), label: 'Налаштування', icon: <SettingOutlined /> },
	{ key: getKey('/logout'), label: 'Вихід', icon: <LogoutOutlined /> }
];
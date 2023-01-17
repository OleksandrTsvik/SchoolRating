import React from 'react';
import {
	AreaChartOutlined,
	BookOutlined,
	TeamOutlined,
	BankOutlined,
	UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

export interface MenuItem {
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
}

export const items: MenuItem[] = [
	{ label: 'Статистика', icon: <AreaChartOutlined /> },
	{ label: 'Предмети', icon: <BookOutlined /> },
	{ label: 'Класи', icon: <TeamOutlined /> },
	{ label: 'Викладання предметів', icon: <BankOutlined /> },
	{ label: 'Користувачі', icon: <UserOutlined /> },
	{ label: 'Налаштування', icon: <SettingOutlined /> },
].map((item, index) => ({ ...item, key: index + 1 }));
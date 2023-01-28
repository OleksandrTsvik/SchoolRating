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
import { Link } from 'react-router-dom';

function getKey(url: string): string {
	return `/admin${url}`;
}

function getItem(url: string, label: string, icon: React.ReactNode): ItemType {
	return {
		key: getKey(url),
		label: <Link to={getKey(url)}>{label}</Link>,
		icon
	};
}

export const items: ItemType[] = [
	getItem('/statistics', 'Статистика', <AreaChartOutlined />),
	getItem('/subjects', 'Предмети', <BookOutlined />),
	getItem('/classes', 'Класи', <TeamOutlined />),
	getItem('/educations', 'Викладання предметів', <BankOutlined />),
	getItem('/users', 'Користувачі', <UserOutlined />),
	getItem('/settings', 'Налаштування', <SettingOutlined />),
	getItem('/logout', 'Вихід', <LogoutOutlined />)
];
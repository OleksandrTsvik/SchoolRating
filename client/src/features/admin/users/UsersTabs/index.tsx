import { Tabs } from 'antd';
import type { Tab } from 'rc-tabs/lib/interface';

import Admins from '../Admins';
import Students from '../Students';
import Teachers from '../Teachers';

const tabs: Tab[] = [
	{ key: '1', label: 'Адміни', children: <Admins /> },
	{ key: '2', label: 'Учителі', children: <Teachers /> },
	{ key: '3', label: 'Учні', children: <Students /> }
];

export default function UsersTabs() {
	return (
		<Tabs
			defaultActiveKey="1"
			centered
			items={tabs}
		/>
	);
}
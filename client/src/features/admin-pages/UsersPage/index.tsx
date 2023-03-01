import { Tabs } from 'antd';
import type { Tab } from 'rc-tabs/lib/interface';

import Admins from './Admins';
import Teachers from './Teachers';
import Students from './Students';

const tabs: Tab[] = [
	{ key: '1', label: 'Адміни', children: <Admins /> },
	{ key: '2', label: 'Учителі', children: <Teachers /> },
	{ key: '3', label: 'Учні', children: <Students /> }
];

export default function UsersPage() {
	document.title = 'Користувачі';

	return (
		<Tabs
			defaultActiveKey="1"
			centered
			items={tabs}
		/>
	);
}
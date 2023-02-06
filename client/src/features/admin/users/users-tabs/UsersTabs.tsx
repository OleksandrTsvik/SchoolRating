import { Tabs } from 'antd';

import { tabs } from './tabs';

export default function UsersTabs() {
	return (
		<Tabs
			defaultActiveKey="1"
			centered
			items={tabs}
		/>
	);
}
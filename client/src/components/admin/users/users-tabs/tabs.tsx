import type { Tab } from 'rc-tabs/lib/interface';

import Admins from '../admins/Admins';

export const tabs: Tab[] = [
	{ key: '1', label: 'Адміни', children: <Admins /> },
	{ key: '2', label: 'Вчителі', children: 'Content Вчителі' },
	{ key: '3', label: 'Учні', children: 'Content Учні' }
];
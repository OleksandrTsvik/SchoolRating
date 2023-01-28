import React from 'react';
import { Content } from 'antd/es/layout/layout';

import styles from './AdminMain.module.scss';

interface Props {
	children?: React.ReactNode;
}

export default function AdminMain({ children }: Props) {
	return (
		<Content className={styles.container}>
			<div className={styles.wrapper}>
				{children}
			</div>
		</Content>
	);
}
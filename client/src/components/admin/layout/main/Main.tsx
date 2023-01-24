import React from 'react';
import { Content } from 'antd/es/layout/layout';

import styles from './Main.module.scss';

interface Props {
	children?: React.ReactNode;
}

export default function Main({ children }: Props) {
	return (
		<Content className={styles.container}>
			<div className={styles.wrapper}>
				{children}
			</div>
		</Content>
	);
}
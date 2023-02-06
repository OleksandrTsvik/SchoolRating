import React from 'react';

import styles from './UserMain.module.scss';

interface Props {
	children?: React.ReactNode;
}

export default function UserMain({ children }: Props) {
	return (
		<div className={`${styles.main} container py-3`}>
			<div className="px-3">
				{children}
			</div>
		</div>
	);
}
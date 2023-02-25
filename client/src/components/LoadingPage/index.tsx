import { Spin } from 'antd';

import styles from './LoadingPage.module.scss';

export default function LoadingPage() {
	return (
		<div className={styles.wrapper}>
			<Spin
				className={styles.spinner}
				tip="Завантаження..."
				size="large"
			/>
		</div>
	);
}
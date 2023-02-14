import { Footer } from 'antd/es/layout/layout';

import styles from './UserFooter.module.scss';

export default function UserFooter() {
	return (
		<Footer
			className={`${styles.footer} text-white px-3 py-4`}
		>
			{/*© 2023 - {(new Date()).getFullYear()}. Copyright:&ensp;*/}
			© 2023. Copyright:&ensp;
			<a
				href="mailto:ipz203_tsos@student.ztu.edu.ua"
				className="text-break"
			>
				ipz203_tsos@student.ztu.edu.ua
			</a>
		</Footer>
	);
}
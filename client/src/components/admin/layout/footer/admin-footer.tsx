import { Footer } from 'antd/es/layout/layout';

export default function AdminFooter() {
	return (
		<Footer style={{ textAlign: 'center' }}>
			{/*© 2023 - {(new Date()).getFullYear()}. Copyright:&ensp;*/}
			© 2023. Copyright:&ensp;
			<a href="mailto:ipz203_tsos@student.ztu.edu.ua">ipz203_tsos@student.ztu.edu.ua</a>
		</Footer>
	);
}
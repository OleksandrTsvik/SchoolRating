import Title from 'antd/es/typography/Title';
import { Button } from 'antd';
import { BookOutlined } from '@ant-design/icons';

import TableSubjects from '../table-subjects/table-subjects';

export default function SubjectsPage() {
	return (
		<>
			<Title level={2} className="text-center">Предмети ({0})</Title>
			<div className="text-end mb-3">
				<Button
					type="primary"
					size="large"
					icon={<BookOutlined />}
				>
					Додати новий предмет</Button>
			</div>
			<TableSubjects />
		</>
	);
}
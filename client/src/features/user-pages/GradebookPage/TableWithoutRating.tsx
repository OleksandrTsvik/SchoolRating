import { IStudent } from '../../../models/IStudent';
import getFullName from '../../../utils/getFullName';

import styles from './GradebookPage.module.scss';

interface Props {
	students: Omit<IStudent, 'cls'>[];
}

export default function TableWithoutRating({ students }: Props) {
	return (
		<>
			<table className={styles.table}>
				<thead>
				<tr>
					<th>#</th>
					<th>ПІБ</th>
				</tr>
				</thead>
				<tbody>
				{students.map((student, index) => (
					<tr key={student.id}>
						<td>{index + 1}</td>
						<td>{getFullName(student)}</td>
					</tr>
				))}
				</tbody>
			</table>
		</>
	);
}
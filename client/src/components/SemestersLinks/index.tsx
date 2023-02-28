import { ISemester } from '../../models/ISemester';

import styles from './SemestersLinks.module.scss';

interface Props {
	semesters: ISemester[];
	className?: string;
	onClick?: (semester: ISemester) => void;
}

export default function SemestersLinks({ semesters, className, onClick }: Props) {
	if (semesters.length === 0) {
		return <></>;
	}

	return (
		<div className={`${styles.container} ${className}`}>
			{semesters.map((semester) => (
				<div
					key={semester.title}
					className={styles.semester}
					onClick={() => onClick ? onClick(semester) : {}}
				>
					{semester.title}
				</div>
			))}
		</div>
	);
}
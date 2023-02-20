import { useMemo } from 'react';

import { useAppSelector } from '../store';
import { selectCurrentStudent } from '../api/auth/student/authStudentSlice';
import { selectCurrentTeacher } from '../api/auth/teacher/authTeacherSlice';
import { Role } from '../models/role.enum';

export default function useUserAuth() {
	const student = useAppSelector(selectCurrentStudent);
	const teacher = useAppSelector(selectCurrentTeacher);

	return useMemo(() => {
		const isStudent = !!student;
		const isTeacher = !!teacher;
		
		const role = isStudent ? Role.Student
			: isTeacher ? Role.Teacher
				: Role.Anonymous;

		return {
			student,
			teacher,
			isAuth: isStudent || isTeacher,
			isStudent,
			isTeacher,
			role
		};
	}, [student, teacher]);
}

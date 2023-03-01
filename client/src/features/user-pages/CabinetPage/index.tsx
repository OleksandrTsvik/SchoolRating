import { Navigate } from 'react-router-dom';

import useUserAuth from '../../../hooks/useUserAuth';
import StudentCabinet from './StudentCabinet';
import TeacherCabinet from './TeacherCabinet';

export default function CabinetPage() {
	document.title = 'Кабінет';
	
	const { isStudent, isTeacher, student, teacher } = useUserAuth();

	if (isStudent) {
		return <StudentCabinet id={student.id} />;
	}

	if (isTeacher) {
		return <TeacherCabinet id={teacher.id} />;
	}

	return <Navigate to="/login" replace />;
}
import { Navigate } from 'react-router-dom';

import useUserAuth from '../../../hooks/useUserAuth';
import StudentCabinet from './StudentCabinet';
import TeacherCabinet from './TeacherCabinet';

export default function CabinetPage() {
	const { isStudent, isTeacher, user } = useUserAuth();
	console.log('CabinetPage')
	if (isStudent) {
		return <StudentCabinet id={user.id} />;
	}

	if (isTeacher) {
		return <TeacherCabinet id={user.id} />;
	}

	return <>{'Navigate to="/login" replace'}</>;
}
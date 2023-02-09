import { StudentEntity } from '../student.entity';

export default interface StudentsResponse {
	total: number;
	data: StudentEntity[];
	page: number;
	limit: number;
}
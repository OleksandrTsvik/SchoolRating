import { Role } from '../role.enum';

export interface User {
	id: string;
	role: Role.Student | Role.Teacher;
}
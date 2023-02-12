import { IStudent } from './IStudent';

export interface IClass {
	id: string;
	name: string;
	students: Omit<IStudent, 'cls'>[];
}
import { IStudent } from './IStudent';
import { IEducation } from './IEducation';

export interface IClass {
	id: string;
	name: string;
	students: Omit<IStudent, 'cls'>[];
	educations: Omit<IEducation, 'cls'>[];
}
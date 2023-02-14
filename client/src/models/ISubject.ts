import { IEducation } from './IEducation';

export interface ISubject {
	id: string;
	name: string;
	educations: Omit<IEducation, 'subject'>[];
}
import { IEducation } from './IEducation';

export interface ITeacher {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
	educations: Omit<IEducation, 'teacher'>[];
}
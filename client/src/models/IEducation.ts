import { ITeacher } from './ITeacher';
import { IClass } from './IClass';
import { ISubject } from './ISubject';

export interface IEducation {
	id: string;
	teacher: Omit<ITeacher, 'educations'> | null;
	cls: Omit<IClass, 'educations'> | null;
	subject: Omit<ISubject, 'educations'> | null;
}
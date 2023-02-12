import { IClass } from './IClass';

export interface IStudent {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
	cls: Omit<IClass, 'students'> | null;
}
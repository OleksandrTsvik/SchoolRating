import { IClass } from './IClass';
import { IRating } from './IRating';

export interface IStudent {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
	cls: Omit<IClass, 'students'> | null;
	ratings: Omit<IRating, 'student'>[];
}
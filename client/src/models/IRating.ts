import { IStudent } from './IStudent';
import { IEducation } from './IEducation';

export interface IRating {
	id: string;
	mark: number | null;
	isPresence: boolean;
	date: Date;
	description: string | null;
	student: Omit<IStudent, 'ratings'>;
	education: Omit<IEducation, 'ratings'> | null;
}
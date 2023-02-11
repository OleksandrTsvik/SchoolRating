import { Request, Express } from 'express';

export default interface RequestWithUser<T extends Express.User> extends Request {
	user: T;
}
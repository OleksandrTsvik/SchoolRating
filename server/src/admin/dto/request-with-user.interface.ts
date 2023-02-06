import { Request } from 'express';
import { JwtPayloadDto } from './jwt-payload.dto';

export default interface RequestWithUser extends Request {
	user: JwtPayloadDto;
}
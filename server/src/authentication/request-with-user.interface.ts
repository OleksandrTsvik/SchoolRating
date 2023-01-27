import { Request } from 'express';
import { AuthPayloadDto } from './dto/auth-payload.dto';

export default interface RequestWithUser extends Request {
	user: AuthPayloadDto;
}
import { Request } from 'express';
import { AuthAdminPayloadDto } from './dto/auth-admin-payload.dto';

export default interface RequestWithUser extends Request {
	user: AuthAdminPayloadDto;
}
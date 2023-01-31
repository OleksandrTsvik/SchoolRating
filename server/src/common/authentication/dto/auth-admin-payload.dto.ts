import { Role } from './role.enum';

export class AuthAdminPayloadDto {
	id: string;
	email: string;
	role: Role;
}
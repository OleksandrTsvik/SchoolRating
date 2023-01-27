import { Role } from './role.enum';

export class AuthPayloadDto {
	id: string;
	role: Role;
}
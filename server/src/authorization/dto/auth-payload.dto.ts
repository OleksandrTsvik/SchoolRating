import { Role } from './role.enum';

export class AuthPayloadDto {
	email: string;
	role: Role;
}
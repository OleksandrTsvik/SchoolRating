import { Role } from '../../common/enums/role.enum';

export class JwtPayloadDto {
	id: string;
	email: string;
	role: Role;
}
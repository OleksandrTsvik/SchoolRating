import { Role } from '../../common/enums/role.enum';

export class JwtPayloadDto {
	id: string;
	firstName: string;
	lastName: string;
	patronymic: string;
	email: string;
	createdAt: Date;
	role: Role;
}
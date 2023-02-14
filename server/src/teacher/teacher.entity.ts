import { Entity, OneToMany } from 'typeorm';
import { BaseUserEntity } from '../common/entities/base-user.entity';
import { EducationEntity } from '../education/education.entity';

@Entity('teachers')
export class TeacherEntity extends BaseUserEntity {
	@OneToMany((type) => EducationEntity, (education) => education.teacher)
	educations: EducationEntity[];
}
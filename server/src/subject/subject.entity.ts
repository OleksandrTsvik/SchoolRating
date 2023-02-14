import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EducationEntity } from '../education/education.entity';

@Entity('subjects')
export class SubjectEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { unique: true, length: 64 })
	name: string;

	@OneToMany((type) => EducationEntity, (education) => education.subject)
	educations: EducationEntity[];
}
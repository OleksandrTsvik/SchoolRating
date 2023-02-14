import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from '../student/student.entity';
import { EducationEntity } from '../education/education.entity';

@Entity('classes')
export class ClassEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { unique: true, length: 8 })
	name: string;

	@OneToMany((type) => StudentEntity, (student) => student.cls)
	students: StudentEntity[];

	@OneToMany((type) => EducationEntity, (education) => education.cls)
	educations: EducationEntity[];
}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationEntity } from '../education/education.entity';
import { StudentEntity } from '../student/student.entity';

@Entity('ratings')
export class RatingEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('smallint', { nullable: true })
	mark: number | null;

	@Column('boolean', { default: true })
	isPresence: boolean;

	@Column('date')
	date: Date;

	@Column('varchar', { length: 64, nullable: true })
	description: string | null;

	@ManyToOne((type) => StudentEntity, (student) => student.ratings, {
		onDelete: 'CASCADE',
		nullable: false
	})
	student: StudentEntity;

	@ManyToOne((type) => EducationEntity, (education) => education.ratings, {
		onDelete: 'SET NULL',
		nullable: true
	})
	education: EducationEntity | null;
}
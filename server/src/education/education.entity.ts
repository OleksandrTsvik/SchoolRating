import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherEntity } from '../teacher/teacher.entity';
import { ClassEntity } from '../class/class.entity';
import { SubjectEntity } from '../subject/subject.entity';
import { RatingEntity } from '../rating/rating.entity';

@Entity('educations')
export class EducationEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne((type) => TeacherEntity, (teacher) => teacher.educations, {
		onDelete: 'SET NULL',
		nullable: true
	})
	teacher: TeacherEntity | null;

	@ManyToOne((type) => ClassEntity, (cls) => cls.educations, {
		onDelete: 'SET NULL',
		nullable: true
	})
	cls: ClassEntity | null;

	@ManyToOne((type) => SubjectEntity, (subject) => subject.educations, {
		onDelete: 'SET NULL',
		nullable: true
	})
	subject: SubjectEntity | null;

	@OneToMany((type) => RatingEntity, (rating) => rating.education)
	ratings: RatingEntity[];
}
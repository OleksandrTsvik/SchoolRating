import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseUserEntity } from '../common/entities/base-user.entity';
import { ClassEntity } from '../class/class.entity';
import { RatingEntity } from '../rating/rating.entity';

@Entity('students')
export class StudentEntity extends BaseUserEntity {
	@ManyToOne((type) => ClassEntity, (cls) => cls.students, {
		onDelete: 'SET NULL',
		nullable: true,
	})
	cls: ClassEntity | null;

	@OneToMany((type) => RatingEntity, (rating) => rating.student)
	ratings: RatingEntity[];
}
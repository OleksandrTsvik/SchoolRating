import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classes')
export class ClassEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { unique: true, length: 8 })
	name: string;
}
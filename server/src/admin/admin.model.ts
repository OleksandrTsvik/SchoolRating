import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class AdminModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { unique: true, length: 64 })
	email: string;

	@Column('varchar', { length: 256 })
	password: string;
}
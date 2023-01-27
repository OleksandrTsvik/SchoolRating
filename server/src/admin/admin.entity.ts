import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class AdminEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { unique: true, length: 64 })
	email: string;

	@Exclude()
	@Column('varchar', { length: 256 })
	hashedPassword: string;

	@Exclude()
	@Column('varchar', { nullable: true, length: 512 })
	hashedRefreshToken: string | null;
}
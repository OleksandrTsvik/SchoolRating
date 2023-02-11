import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseUserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 32 })
	firstName: string;

	@Column('varchar', { length: 32 })
	lastName: string;

	@Column('varchar', { length: 32 })
	patronymic: string;

	@Column('varchar', { unique: true, length: 64 })
	email: string;

	@Exclude()
	@Column('varchar', { length: 256 })
	hashedPassword: string;

	@Exclude()
	@Column('varchar', { nullable: true, length: 512 })
	hashedRefreshToken: string | null;

	@CreateDateColumn()
	createdAt: Date;

	@Exclude()
	@UpdateDateColumn()
	updatedAt: Date;
}
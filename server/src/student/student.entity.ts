import { Entity } from 'typeorm';
import { BaseUserEntity } from '../common/entities/base-user.entity';

@Entity('students')
export class StudentEntity extends BaseUserEntity {}
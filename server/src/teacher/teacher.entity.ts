import { Entity } from 'typeorm';
import { BaseUserEntity } from '../common/entities/base-user.entity';

@Entity('teachers')
export class TeacherEntity extends BaseUserEntity {}
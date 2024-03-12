import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ETaskStatus } from './tasks-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';

/**
 * Represents a task entity in the task management application.
 */
@Entity()
export class Task extends BaseEntity {
  /**
   * The unique identifier of the task.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * The title of the task.
   */
  @Column()
  @ApiProperty()
  title: string;

  /**
   * The description of the task.
   */
  @Column()
  @ApiProperty()
  description: string;

  /**
   * The status of the task.
   */
  @Column()
  @ApiProperty()
  status: ETaskStatus;

  /**
   * The user associated with the task.
   */
  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;

  /**
   * The ID of the user associated with the task.
   */
  @Column()
  userId: string;
}

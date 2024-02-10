import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ETaskStatus } from './tasks-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ETaskStatus;
}

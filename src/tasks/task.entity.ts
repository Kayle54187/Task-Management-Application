import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ETaskStatus } from './tasks-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  status: ETaskStatus;
}

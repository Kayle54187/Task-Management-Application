import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  //   @OneToMany(
  //     type => Task,
  //     task => task.user,
  //     { eager: true },
  //   )
  //   tasks: Task[];
}

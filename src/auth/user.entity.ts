import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/task.entity';

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  /**
   * The id of the User.
   */
  @ApiProperty({ description: 'The id of the User' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The username of the User.
   */
  @ApiProperty({ description: 'The username of the User' })
  @Column()
  username: string;

  /**
   * The password of the User.
   */
  @Column()
  password: string;

  /**
   * The salt used for password hashing.
   */
  @Column()
  salt: string;

  /**
   * The tasks associated with the User.
   */
  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  /**
   * Validates the provided password against the User's stored password.
   * @param password - The password to validate.
   * @returns A Promise that resolves to a boolean indicating whether the password is valid.
   */
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

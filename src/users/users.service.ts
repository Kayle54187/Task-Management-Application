import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Retrieves all users from the user repository.
   * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
   */
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  /**
   * Retrieves the logged in user.
   * @returns {string} The logged in user.
   */
  GetLoggedInUser(): string {
    return 'This will return the logged in user';
  }
}

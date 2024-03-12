import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from 'utils/passwords';

/**
 * Repository class for managing User entities.
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Creates an instance of UserRepository.
   * @param entityManager - The EntityManager instance.
   */
  constructor(private readonly entityManager: EntityManager) {
    super(User, entityManager);
  }

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of User entities.
   * @throws InternalServerErrorException if an error occurs while retrieving users.
   */
  async getAllUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    return await query.getMany().catch(() => {
      throw new InternalServerErrorException(`Users not found`);
    });
  }

  /**
   * Creates a new user.
   * @param authCredentialsDto - The DTO containing the user's authentication credentials.
   * @throws ConflictException if the username already exists.
   * @throws InternalServerErrorException if an error occurs while saving the user.
   */
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await hashPassword(password, user.salt);

    await user.save().catch((error) => {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException('Error while saving user');
    });
  }

  /**
   * Validates the user's password.
   * @param authCredentialsDto - The DTO containing the user's authentication credentials.
   * @returns The username of the user if the password is valid.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({
      where: { username },
    });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}

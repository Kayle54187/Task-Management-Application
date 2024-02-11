import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InternalServerErrorException } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  constructor(private readonly entityManager: EntityManager) {
    super(User, entityManager);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save().catch((error) => {
      if (error.code === '23505') {
        // Code for duplicate username
        throw new InternalServerErrorException('Username already exists');
      }
      throw new InternalServerErrorException('Error while saving user');
    });
  }
}

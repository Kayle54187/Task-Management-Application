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
    await user.save().catch(() => {
      throw new InternalServerErrorException('Error while saving user');
    });
  }
}

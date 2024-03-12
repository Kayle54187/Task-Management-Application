import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';

/**
 * JwtStrategy class that extends PassportStrategy.
 * This class is responsible for validating JWT tokens and extracting user information from the payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  /**
   * Validates the JWT payload and retrieves the user information from the database.
   * @param payload - The JWT payload containing user information.
   * @returns The user object if found, otherwise throws an UnauthorizedException.
   */
  async validate(payload: IJwtPayload) {
    const { userName } = payload;

    const user = await this.userRepository.find({
      where: { username: userName },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    return user;
  }
}

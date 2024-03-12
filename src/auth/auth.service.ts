import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

/**
 * Service responsible for handling authentication related operations.
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a new user with the provided credentials.
   * @param authCredentialsDto - The authentication credentials of the user.
   * @returns The created user.
   */
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return await this.userRepository.createUser(authCredentialsDto);
  }

  /**
   * Authenticates a user with the provided credentials and generates an access token.
   * @param authCredentialsDto - The authentication credentials of the user.
   * @returns An object containing the access token.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const userName =
      await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!userName) throw new UnauthorizedException('Invalid credentials');

    const payload: IJwtPayload = { userName };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}

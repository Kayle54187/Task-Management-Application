import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInValidationPipe } from './pipes/sign-in-validation.pipe';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign up a new user.
   * @param authCredentialsDto - The username and password of the user.
   * @returns A promise that resolves to the result of the sign up operation.
   */
  @Post('/signup')
  @UsePipes(ValidationPipe)
  @ApiBody({
    type: AuthCredentialsDto,
    description: 'The username and password of the user',
  })
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.signUp(authCredentialsDto);
  }

  /**
   * Sign in an existing user.
   * @param authCredentialsDto - The username and password of the user.
   * @returns A promise that resolves to an object containing the access token.
   */
  @Post('/signin')
  @UsePipes(SignInValidationPipe)
  @ApiBody({
    type: AuthCredentialsDto,
    description: 'The username and password of the user',
  })
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}

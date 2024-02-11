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

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  @ApiBody({
    type: AuthCredentialsDto,
    description: 'The username and password of the user',
  })
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.signUp(authCredentialsDto);
  }
}

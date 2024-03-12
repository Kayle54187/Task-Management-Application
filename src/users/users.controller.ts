import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
import { UsersService } from './users.service';

/**
 * Controller for managing users.
 */
@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users.
   * @returns An array of User objects.
   */
  @Get('/')
  @ApiResponse({
    type: [User],
  })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  /**
   * Get the currently logged-in user.
   * @returns A User object representing the logged-in user.
   */
  @Get('/current')
  @ApiResponse({
    type: User,
  })
  GetLoggedInUser() {
    return this.usersService.GetLoggedInUser();
  }
}

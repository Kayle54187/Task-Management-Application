import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Data transfer object for authentication credentials.
 */
export class AuthCredentialsDto {
  /**
   * The username of the user.
   * @IsString() - Validates that the value is a string.
   * @MinLength(4) - Validates that the value has a minimum length of 4 characters.
   * @MaxLength(20) - Validates that the value has a maximum length of 20 characters.
   * @IsNotEmpty() - Validates that the value is not empty.
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user',
  })
  username: string;

  /**
   * The password of the user.
   * @IsString() - Validates that the value is a string.
   * @MinLength(4) - Validates that the value has a minimum length of 4 characters.
   * @IsNotEmpty() - Validates that the value is not empty.
   * @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
   *   message: 'Password too weak',
   * }) - Validates that the value matches the specified regex pattern.
   */
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the user',
  })
  password: string;
}

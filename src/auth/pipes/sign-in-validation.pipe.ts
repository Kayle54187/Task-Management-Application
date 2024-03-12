import { BadRequestException, PipeTransform } from '@nestjs/common';

/**
 * Pipe used for validating sign-in credentials.
 */
export class SignInValidationPipe implements PipeTransform {
  /**
   * Transforms the input value by validating the username and password.
   * @param value - The input value to be transformed.
   * @returns The transformed value.
   * @throws BadRequestException if the username or password is missing.
   */
  transform(value: any) {
    if (!value.username || !value.password) {
      throw new BadRequestException('Invalid credentials');
    }
    return value;
  }
}

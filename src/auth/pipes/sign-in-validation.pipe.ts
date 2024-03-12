import { BadRequestException, PipeTransform } from '@nestjs/common';

export class SignInValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.username || !value.password) {
      throw new BadRequestException('Invalid credentials');
    }
    return value;
  }
}

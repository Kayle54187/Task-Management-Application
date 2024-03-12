import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ETaskStatus } from '../tasks-status.enum';

/**
 * A custom pipe for validating the status of a task.
 */
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ETaskStatus.DONE,
    ETaskStatus.IN_PROGRESS,
    ETaskStatus.OPEN,
  ];

  /**
   * Transforms the input value to uppercase and validates if it is a valid status.
   * @param value - The input value to be transformed and validated.
   * @returns The transformed and validated value.
   * @throws BadRequestException if the value is not a valid status.
   */
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}

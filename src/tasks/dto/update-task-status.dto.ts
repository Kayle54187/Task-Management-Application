import { ApiProperty } from '@nestjs/swagger';
import { ETaskStatus } from '../tasks-status.enum';

export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: ETaskStatus,
  })
  status: ETaskStatus;
}

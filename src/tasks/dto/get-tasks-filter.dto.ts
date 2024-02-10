import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ETaskStatus } from '../tasks-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([ETaskStatus.OPEN, ETaskStatus.IN_PROGRESS, ETaskStatus.DONE])
  status: ETaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

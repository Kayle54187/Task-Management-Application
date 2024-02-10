import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ETaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([ETaskStatus.OPEN, ETaskStatus.IN_PROGRESS, ETaskStatus.DONE])
  status: ETaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

import { ETaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  status: ETaskStatus;
  search: string;
}

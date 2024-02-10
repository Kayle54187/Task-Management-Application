import { ETaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  id: string;
  status: ETaskStatus;
}

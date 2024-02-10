import { ETaskStatus } from '../tasks-status.enum';

export class UpdateTaskStatusDto {
  id: string;
  status: ETaskStatus;
}

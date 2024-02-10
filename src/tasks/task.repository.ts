import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ETaskStatus } from './tasks-status.enum';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = ETaskStatus.OPEN;

    await task.save().catch(() => {
      throw new InternalServerErrorException(`Task not created`);
    });
    return task;
  }
}

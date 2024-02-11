import { InternalServerErrorException } from '@nestjs/common';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { ETaskStatus } from './tasks-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  constructor(private readonly entityManager: EntityManager) {
    super(Task, entityManager);
  }

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

  async updateTaskStatus(id: string, status: ETaskStatus): Promise<Task> {
    const task = await this.findOne({
      where: { id },
    }).catch(() => {
      throw new InternalServerErrorException(`Task not found`);
    });

    task.status = status;
    await task.save().catch(() => {
      throw new InternalServerErrorException(`Task not updated`);
    });

    return task;
  }
}

import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { ETaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  constructor(private readonly entityManager: EntityManager) {
    super(Task, entityManager);
  }

  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany().catch(() => {
      throw new InternalServerErrorException(`Tasks not found`);
    });

    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOne({
      where: { id },
    }).catch(() => {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    });

    return found;
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

  async deleteTask(id: string) {
    const result = await this.delete(id).catch(() => {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

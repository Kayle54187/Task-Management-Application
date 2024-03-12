import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { ETaskStatus } from './tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  constructor(private readonly entityManager: EntityManager) {
    super(Task, entityManager);
  }

  /**
   * Retrieves all tasks based on the provided filter criteria.
   * @param filterDto - The filter criteria for retrieving tasks.
   * @param user - The user associated with the tasks.
   * @returns A promise that resolves to an array of tasks.
   */
  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;

    query.andWhere('task.userId = :userId', { userId: user.id });

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

  /**
   * Retrieves a task by its ID.
   * @param id - The ID of the task.
   * @param user - The user associated with the task.
   * @returns A promise that resolves to the found task.
   * @throws NotFoundException if the task with the specified ID is not found.
   */
  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.findOne({
      where: { id, userId: user.id },
    }).catch(() => {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    });

    return found;
  }

  /**
   * Creates a new task.
   * @param createTaskDto - The data for creating the task.
   * @param user - The user associated with the task.
   * @returns A promise that resolves to the created task.
   * @throws InternalServerErrorException if the task creation fails.
   */
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = ETaskStatus.OPEN;
    task.user = user;

    await task.save().catch(() => {
      throw new InternalServerErrorException(`Task not created`);
    });

    delete task.user;

    return task;
  }

  /**
   * Updates the status of a task.
   * @param id - The ID of the task.
   * @param status - The new status of the task.
   * @param user - The user associated with the task.
   * @returns A promise that resolves to the updated task.
   * @throws InternalServerErrorException if the task update fails.
   */
  async updateTaskStatus(
    id: string,
    status: ETaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne({
      where: { id, userId: user.id },
    }).catch(() => {
      throw new InternalServerErrorException(`Task not found`);
    });

    task.status = status;
    await task.save().catch(() => {
      throw new InternalServerErrorException(`Task not updated`);
    });

    delete task.user;

    return task;
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   * @throws NotFoundException if the task with the specified ID is not found.
   */
  async deleteTask(id: string) {
    const result = await this.delete(id).catch(() => {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';
import { ETaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  /**
   * Retrieves all tasks based on the provided filter and user.
   * @param filterDto - The filter criteria for retrieving tasks.
   * @param user - The user associated with the tasks.
   * @returns A promise that resolves to an array of tasks.
   */
  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getAllTasks(filterDto, user);
  }

  /**
   * Retrieves a task by its ID and user.
   * @param id - The ID of the task to retrieve.
   * @param user - The user associated with the task.
   * @returns A promise that resolves to the retrieved task.
   */
  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.taskRepository.getTaskById(id, user);
  }

  /**
   * Creates a new task for the specified user.
   * @param createTaskDto - The data for creating the task.
   * @param user - The user associated with the task.
   * @returns A promise that resolves to the created task.
   */
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  /**
   * Deletes a task by its ID and user.
   * @param id - The ID of the task to delete.
   * @param user - The user associated with the task.
   * @returns A promise that resolves when the task is deleted.
   * @throws NotFoundException if the task with the specified ID is not found.
   */
  async deleteTask(id: string, user: User) {
    return await this.taskRepository
      .delete({ id: id, userId: user.id })
      .catch(() => new NotFoundException(`Task with ID "${id}" not found`));
  }

  /**
   * Updates the status of a task by its ID and user.
   * @param id - The ID of the task to update.
   * @param status - The new status of the task.
   * @param user - The user associated with the task.
   * @returns A promise that resolves when the task is updated.
   */
  async updateTaskStatus(id: string, status: ETaskStatus, user: User) {
    return await this.taskRepository.updateTaskStatus(id, status, user);
  }
}

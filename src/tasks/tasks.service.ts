import { Injectable } from '@nestjs/common';
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

  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getAllTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.taskRepository.getTaskById(id, user);
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string) {
    return await this.taskRepository.delete(id);
  }

  async updateTaskStatus(id: string, status: ETaskStatus, user: User) {
    return await this.taskRepository.updateTaskStatus(id, status, user);
  }
}

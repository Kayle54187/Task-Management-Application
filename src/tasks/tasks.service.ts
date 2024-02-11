import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      });

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string) {
    const result = await this.taskRepository.delete(id).catch(() => {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus({ id, status }) {
    return await this.taskRepository.updateTaskStatus(id, status);
  }
}

import { Injectable } from '@nestjs/common';
import { ETaskStatus, ITask } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const task: ITask = {
      id: uuidv4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: ETaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): ITask {
    const task: ITask = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task !== task);
    return task;
  }

  updateTaskStatus(updateTaskStatus: UpdateTaskStatusDto): ITask {
    const { id, status } = updateTaskStatus;
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}

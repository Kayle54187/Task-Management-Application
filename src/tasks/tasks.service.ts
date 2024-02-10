import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { ETaskStatus, ITask } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
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
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  deleteTask(id: string): ITask {
    const found = this.getTaskById(id);
    const task: ITask = this.tasks.find((task) => task.id === found.id);
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

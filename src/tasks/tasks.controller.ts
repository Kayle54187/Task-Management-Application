import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { ETaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('/tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiResponse({
    type: [Task],
    description: 'A list of all Tasks',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter by search',
  })
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto);
  }

  @Post()
  @ApiBody({
    type: CreateTaskDto,
    schema: { title: 'string', description: 'string' },
    description: 'Create a new task',
  })
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  @ApiResponse({
    type: Task,
    description: 'Get a task by ID',
  })
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id/delete')
  @ApiResponse({
    type: undefined,
  })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  @ApiResponse({
    type: Task,
    description: 'Update a task status',
  })
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: ETaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus({ id, status });
  }
}

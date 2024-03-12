import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { ETaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('/tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token')
@ApiTags('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Get a list of tasks.
   * @param filterDto - The filter criteria for tasks.
   * @param user - The user making the request.
   * @returns A promise that resolves to an array of tasks.
   */
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
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto, user);
  }

  /**
   * Create a new task.
   * @param createTaskDto - The data for creating a task.
   * @param user - The user making the request.
   * @returns A promise that resolves to the created task.
   */
  @Post()
  @ApiBody({
    type: CreateTaskDto,
    schema: { title: 'string', description: 'string' },
    description: 'Create a new task',
  })
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  /**
   * Get a task by ID.
   * @param id - The ID of the task.
   * @param user - The user making the request.
   * @returns A promise that resolves to the task with the specified ID.
   */
  @Get('/:id')
  @ApiResponse({
    type: Task,
    description: 'Get a task by ID',
  })
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  /**
   * Delete a task by ID.
   * @param id - The ID of the task to delete.
   * @param user - The user making the request.
   * @returns A promise that resolves when the task is deleted.
   */
  @Delete('/:id/delete')
  @ApiResponse({
    type: undefined,
  })
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteTask(id, user);
  }

  /**
   * Update the status of a task.
   * @param id - The ID of the task to update.
   * @param status - The new status for the task.
   * @param user - The user making the request.
   * @returns A promise that resolves to the updated task.
   */
  @Patch('/:id/status')
  @ApiBody({
    type: UpdateTaskStatusDto,
    description: 'Update a task status',
  })
  @ApiResponse({
    type: Task,
    description: 'Update a task status',
  })
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: ETaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}

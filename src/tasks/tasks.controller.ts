import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { ETaskStatus } from './tasks-status.enum';

@Controller('/tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

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

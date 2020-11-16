import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo } from './schema/todo.schema';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.$find();
  }

  @Get(':id')
  findOnly(@Param('id') id: string) {
    return this.todosService.$findById(id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body('status') status: boolean) {
    return this.todosService.update(id, status);
  }

  @Post()
  create(@Body('text') text: string) {
    return this.todosService.create({ text });
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.todosService.destroy(id);
  }
}

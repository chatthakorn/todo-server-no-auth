import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todos') private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createTodo: TodoDocument = new this.todoModel(createTodoDto);
    return await createTodo.save();
  }

  async $find(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  async $findById(id: string): Promise<Todo> {
    try {
      return await this.todoModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: string, status: boolean): Promise<any> {
    try {
      return await this.todoModel.updateOne({ _id: id }, { $set: { status } });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async destroy(id: string) {
    try {
      return await this.todoModel.remove({ _id: id }).exec();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}

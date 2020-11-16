import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TodosModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/todos?compressors=zlib&gssapiServiceName=mongodb',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

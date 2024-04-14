//Service
import { AppService } from './app.service';
//Controller
import { AppController } from './app.controller';
//Module
import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [BookModule, MongooseModule.forRoot('mongodb+srv://giadinhthai:Ngpro123@cluster0.gtocs.mongodb.net/365truck'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

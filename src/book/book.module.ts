import { Module } from '@nestjs/common';
import { Book, BookSchema} from '../schema/app.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { BookController  } from './book.controller';
import { BookService } from './book.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    ],
    controllers: [BookController ],
  providers: [ BookService],

})
export class BookModule {}

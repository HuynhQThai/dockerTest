import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ collection: 'book' })
export class Book {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop()
  active: number;

}

export const BookSchema = SchemaFactory.createForClass(Book);
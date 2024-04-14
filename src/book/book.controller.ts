import { Body, Controller, Get, Post, Put, UseGuards, Query, Param, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException, Res, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { BookService } from './book.service';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../schema/app.schema';
import { Model } from 'mongoose';


@Injectable()
@Controller("/api/book")
export class BookController {
  constructor(private readonly bookService: BookService, @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>) {}

  @Post('createBook') 
  async  createBookCon(@Body() body: { name: string, type: string, category: string, price: number}) {
    return this.bookService.createBookSer(body.name, body.type, body.category, body.price);
  }

  @Get('allBook') 
  async  allBookCon() {
    return this.bookService.allBookService();
  }

  @Put('updateBook') 
  async  updateBook(@Body() body: { bookId: string, name: string, type: string, category: string, price: number}) {
    return this.bookService.updateBookService(body.bookId, body.name, body.type, body.category, body.price);
  }

  @Get('searchBook') 
  async  searchBook(@Body() body: { name: string}) {
    return this.bookService.searchBooksByName(body.name);
  }

  @Get('filterBook') 
  async  filterBook(@Body() body: { name: string, type: string, category: string, price: number }) {
    return this.bookService.filterBooks(body.name, body.type, body.category, body.price);
  }
}

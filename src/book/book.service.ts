import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from '../schema/app.schema';
import { register } from 'module';
@Injectable()


export class BookService {
    constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,){}

    
    async createBookSer(name: string, type: string, category: string, price: number): Promise<Book> {
        const active = 1;
        try {
            const newBook = new this.bookModel({
                name,
                type,
                category,
                price,
                active,
            });
            const result = await newBook.save();
            console.log(result);
            return result; // or return relevant information about the created document
        } catch (error) {
            console.error('Error creating document:', error);
            throw new Error('Failed to create document');
        }
    }

    async allBookService(): Promise<Book[]> {
        try {
            const activeBooks = await this.bookModel.find({ active: 1 }).exec();

            return activeBooks;

          } catch (error) {
            console.error('Error finding active books:', error);
            throw new Error('Failed to find active books');
          }
    }

    async updateBookService(bookId: string, nameNew: string, typeNew: string, categoryNew: string, priceNew: number): Promise<Book> {
        try {
            const activeBooks = await this.bookModel.findOneAndUpdate({ active: 1, _id: bookId }, {name: nameNew, type: typeNew, category: categoryNew, price: priceNew}).exec();
            if (!activeBooks) {
                throw new NotFoundException('Book not found or update failed');
            }
            return activeBooks;
        } catch (error) {
            console.error('Error finding active books:', error);
            throw new Error('Failed to find active books');
        }
    }

    async searchBooksByName(nameSearch: string): Promise<Book> {
        try {
          const regexQuery = new RegExp(nameSearch, 'i');
          const matchingBooks = await this.bookModel.findOne({active: 1, name: regexQuery }).exec();
          if (!matchingBooks) {
            throw new NotFoundException('Book not found');
          }
          return matchingBooks;
        } catch (error) {
          console.error('Error searching books by name:', error);
          throw new Error('Failed to search books by name');
        }
      }

    async filterBooks(nameSearch: string, typeSearch: string, categorySearch: string, priceSearch: number){
        try {


            const query: Record<string, any> = { active: 1 };
            var regexName, regexCategory, regexType
            if (nameSearch) {
                regexName = new RegExp(nameSearch, 'i');
            }
        
            if (categorySearch) {
                regexCategory = new RegExp(categorySearch, 'i');

            }
        
            if (typeSearch) {
                regexType = new RegExp(typeSearch, 'i');
            }
            
        
            if (priceSearch !== undefined) {
              query.price = priceSearch;
            }
        
            const matchingBooks = await this.bookModel.find({type: regexType, name: regexName, active: 1}).exec();

            // const matchingBooks = await this.bookModel.findOne({active: 1, name: regexName, type: regexType, category: regexCategory, price: priceSearch }).exec();
            if (!matchingBooks) {
                throw new NotFoundException('Book not found');
            }
            return matchingBooks;
        } catch (error) {
            console.error('Error searching books by name:', error);
            throw new Error('Failed to search books by name');
        }
    }
}

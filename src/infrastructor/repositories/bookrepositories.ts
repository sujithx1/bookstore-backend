import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";
import { BookModel, BookDocument } from "../models/bookmodel";

const ReturnBook = (book: BookDocument): BookEntity => ({
  id: book._id.toString(),
  bookId: book.bookId,
  author: book.author,
  title: book.title,
  description: book.description,
  picture: book.picture,
  price: book.price,
  authorname:book.authorname,
  isActive:book.isActive,
  sellCount: book.sellCount,
  createdAt: book.createdAt,
  updatedAt: book.updatedAt
});

export class BookRepository implements IBookRepository {
  async addBook(book: BookEntity): Promise<BookEntity> {
    const newBook = new BookModel({
      bookId: book.bookId,
      author: book.author,
      title: book.title,
      description: book.description,
      picture: book.picture,
      price: book.price,
      sellCount: book.sellCount ?? 0
    });

    const savedBook = await newBook.save();
    return ReturnBook(savedBook);
  }

  async deleteBook(id: string,isActive:boolean): Promise<BookEntity|null> {
    const result = await BookModel.findByIdAndUpdate(id,
     { $set:{
        isActive:!isActive
      }},
      {upsert:true,new:true}
    
  );
  if(!result)return null
  return ReturnBook(result)
    
  }

  async getAllBooks(): Promise<BookEntity[]> {
    const books = await BookModel.find({isActive:true});
    return books.map(ReturnBook);
  }
  async getAllBooksByAdmin(): Promise<BookEntity[]> {
    const books = await BookModel.find();
    return books.map(ReturnBook);
  }

  async getBookById(id: string): Promise<BookEntity | null> {
    const book = await BookModel.findById(id);
    return book ? ReturnBook(book) : null;
  }

  async getBookByTitle(title: string): Promise<BookEntity | null> {
    const book = await BookModel.findOne({ title });
    return book ? ReturnBook(book) : null;
  }

  async getBooksByAuthor(authorId: string): Promise<BookEntity[]> {
    const books = await BookModel.find({ author: authorId });
    return books.map(ReturnBook);
  }

  async updateBook(id: string, updates: Partial<BookEntity>): Promise<BookEntity | null> {
    const updated = await BookModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    return updated ? ReturnBook(updated) : null;
  }



}

import { BookEntity } from "../entities/bookentity";

export interface IBookRepository {
  addBook(book: BookEntity): Promise<BookEntity>;
  getBookById(id: string): Promise<BookEntity | null>;
  getBookByTitle(title: string): Promise<BookEntity | null>;
  getAllBooks(): Promise<BookEntity[]>;
  getAllBooksByAdmin(): Promise<BookEntity[]>;
  updateBook(id: string, updates: Partial<BookEntity>): Promise<BookEntity | null>;
  deleteBook(is: string,isActive:boolean): Promise<BookEntity|null>;
  getBooksByAuthor(authorId: string): Promise<BookEntity[]>;
}
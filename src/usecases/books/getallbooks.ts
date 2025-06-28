import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";


export class BooksGetall{
    constructor(
        private bookrep:IBookRepository
    ) {
        
    }

    async execute():Promise<BookEntity[]>{
        return await this.bookrep.getAllBooks()
        
    }
}
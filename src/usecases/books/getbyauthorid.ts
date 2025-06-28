import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";

export class BooksGetbyAuthorid{
    constructor(
        private bookrep:IBookRepository
    ) {
        
    }

    async execute(authorId:string):Promise<BookEntity[]>{
        const books=await this.bookrep.getBooksByAuthor(authorId)
        return books
    }
}
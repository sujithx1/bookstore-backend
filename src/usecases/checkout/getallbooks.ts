import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";



export class GetAllBookbyadminusecase{
    constructor(
        private bookRep:IBookRepository
    ) {
        
    }

    async execute():Promise<BookEntity[]>{
        const books= await this.bookRep.getAllBooksByAdmin()
        return books
    }
}
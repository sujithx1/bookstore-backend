



import { AppError } from "../../config/AppError";
import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";
import { ErrorCodes, StatusCode } from "../../types/types";


export class BooksGetbyIduseCase{
    constructor(
        private bookrep:IBookRepository
    ) {
        
    }

    async execute(id:string):Promise<BookEntity>{
        const book= await this.bookrep.getBookById(id)
        
        if(!book)throw new AppError(ErrorCodes.resourceNotFound,StatusCode.BAD_REQUEST);
        return book
        
    }
}
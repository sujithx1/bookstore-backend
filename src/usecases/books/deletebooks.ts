


import { AppError } from "../../config/AppError";
import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";
import { ErrorCodes, StatusCode } from "../../types/types";




export class BookDeleteuseCase{
    constructor(
        private bookrep:IBookRepository
    ) {
        
    }

    async execute(id:string,isActive:string):Promise<boolean>{

        const isBook=await this.bookrep.getBookById(id)
        if(!isBook) throw new AppError(ErrorCodes.resourceNotFound,StatusCode.NOT_FOUND);
      
            const active=isActive==="true"

        const update=await this.bookrep.deleteBook(id,active)
        if(!update)throw new AppError(ErrorCodes.serverError,StatusCode.INTERNAL_SERVER_ERROR)
        
        return true
        
    }
}
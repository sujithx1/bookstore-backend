import { AppError } from "../../config/AppError";
import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";
import { ErrorCodes, StatusCode } from "../../types/types";




export class BookUpdateuseCase{
    constructor(
        private bookrep:IBookRepository
    ) {
        
    }

    async execute(id:string,title:string,description:string,price:number,picture:string,isActive:boolean):Promise<BookEntity>{

        const isBook=await this.bookrep.getBookById(id)
        if(!isBook) throw new AppError(ErrorCodes.resourceNotFound,StatusCode.NOT_FOUND);
        isBook.title=title,
        isBook.description=description,
        isBook.price=price
        isBook.isActive=isActive
        if (picture) {
            isBook.picture=picture
            
        }

        const update=await this.bookrep.updateBook(id,isBook)
        if(!update)throw new AppError(ErrorCodes.serverError,StatusCode.INTERNAL_SERVER_ERROR)
        
            return update
        
    }
}
import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";

export class BookCreateUseCase{
    constructor(
        private bookrep:IBookRepository
    ) {
        
    }


    async execute(title:string,description:string,price:number,author:string,picture:string,status:string,authorname:string):Promise<BookEntity>{

        const newbook:BookEntity={
            id:'',
            bookId:`book-${Date.now().toString()}`,
            author:author,
            description:description,
            price:price,
            title:title,
            isActive:status=="draft"?false:true,
            authorname:authorname,
            
            picture:picture

        }

        return await this.bookrep.addBook(newbook)
        
        
    }
}
import { emailQueue } from "../../config/emailQueu";
import { BookEntity } from "../../domain/entities/bookentity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";
import { IUserRepository } from "../../domain/interfaces/Iuserrep";

export class BookCreateUseCase{
    constructor(
        private bookrep:IBookRepository,
        private userrep:IUserRepository
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

        const newBook= await this.bookrep.addBook(newbook)

         const retailUsers = await this.userrep.findAllUsers();

    const subject = '📘 New Book Release!';
    const html = `<h1>A new book has been released!</h1><p>Check it out now in our store!</p>`;

    for (const user of retailUsers) {
      await emailQueue.add({ to: user.email, subject, html });
    }


    return newBook



        
        
    }
}
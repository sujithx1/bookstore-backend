



export class BookEntity{
    constructor(
  public id:string,
  public bookId: string,
  public title: string,
  public description: string,
  public author: string,
  public authorname: string,
  public isActive: boolean,
  
  
  public price: number,
  public picture: string,
  public sellCount?: number,
  public createdAt?:Date,
  public updatedAt?:Date

    ) {
        
    }
}


export interface Book {
 
}

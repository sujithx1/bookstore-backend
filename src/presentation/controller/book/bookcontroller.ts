import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../config/AppError";
import { ErrorCodes, StatusCode } from "../../../types/types";
import { BookCreateUseCase } from "../../../usecases/books/createBooks";
import { BookUpdateuseCase } from "../../../usecases/books/updatebooks";
import { BookDeleteuseCase } from "../../../usecases/books/deletebooks";
import { BooksGetbyAuthorid } from "../../../usecases/books/getbyauthorid";
import { BooksGetall } from "../../../usecases/books/getallbooks";
import { BooksGetbyIduseCase } from "../../../usecases/books/getbookbyid";

export class BookController {
  constructor(
    private bookcreateusecase: BookCreateUseCase,
    private bookupdateusecase: BookUpdateuseCase,
    private bookdeleteusecase: BookDeleteuseCase,
    private bookgetbyauthorid: BooksGetbyAuthorid,
    private bookgetallbooksusecase:BooksGetall,
    private bookgetbyidusecase:BooksGetbyIduseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, price, author, picture, status ,authorname} = req.body;
      if (!title || !description || !price || !author || !picture || !status||!authorname) {
        return next(
          new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
        );
      }

      const book = await this.bookcreateusecase.execute(
        title,
        description,
        price,
        author,
        picture,
        status
        ,authorname
      );

      return res
        .status(StatusCode.CREATED)
        .json({ message: "Book Created", success: true, book });
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, price, picture,isActive } = req.body;
      const { id } = req.params;
      if (!id) {
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
      }

      const book = await this.bookupdateusecase.execute(
        id,
        title,
        description,
        price,
        picture
        ,isActive
      );

      return res
        .status(StatusCode.OK)
        .json({ message: "Book Updated", success: true, book });
    } catch (error) {
      return next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id ,isActive} = req.params;
      if (!id) {
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
      }
      console.log(isActive);
      

      await this.bookdeleteusecase.execute(id,isActive);

      return res
        .status(StatusCode.OK)
        .json({ message: "Book Blocked ", success: true });
    } catch (error) {
      return next(error);
    }
  }
  async getbooksbyAuthorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorId } = req.params;
      if (!authorId) {
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
      }

      console.log(authorId);
      
     const books= await this.bookgetbyauthorid.execute(authorId);

      return res
        .status(StatusCode.OK)
        .json({ message: "Books", success: true,books});
    } catch (error) {
      return next(error);
    }
  }
  async getallBooks(req: Request, res: Response, next: NextFunction) {
    try {
    
        
      
     const books= await this.bookgetallbooksusecase.execute();

      return res
        .status(StatusCode.OK)
        .json({ message: "Books", success: true,books});
    } catch (error) {
      return next(error);
    }
  }
  async getbookbyid(req: Request, res: Response, next: NextFunction) {
    try {
        const {id}=req.params  
     const book= await this.bookgetbyidusecase.execute(id);
      return res
        .status(StatusCode.OK)
        .json({ message: "Books", success: true,book});
    } catch (error) {
      return next(error);
    }
  }
    
}

import { NextFunction, Request, Response } from "express";
import { FetchAuthorStats } from "../../../usecases/author/authorStatsusecase";
import { AuthorRecentSales } from "../../../usecases/author/authorrecentsalesusecase";
import { AuthorSalesHistory } from "../../../usecases/author/authorsalesHistory";
import { ErrorCodes, StatusCode } from "../../../types/types";
import { AppError } from "../../../config/AppError";

export class AuthorController{
    constructor(
        private authorstatsusecase:FetchAuthorStats,
        private authorrecentsalesusecase:AuthorRecentSales,
        private authorsaleshistoryusecase:AuthorSalesHistory
    ) {
        
    }


    
  async getAuthStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorId} = req.params;
     
      if (!authorId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));   

      const authorstats= await this.authorstatsusecase.execute(authorId);
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "author stats", authorstats  });
    } catch (error) {
      return next(error);
    }
  }


   async getRecentSalesController(req: Request, res: Response,next:NextFunction) {
  try {
    const {authorId} = req.params;
        if (!authorId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));   

    const sales = await this.authorrecentsalesusecase.execute(authorId);
    // console.log('~sales',sales);
    
    return res
        .status(StatusCode.OK)
        .json({ success: true, message: "author stats", sales  });
  } catch (err) {
    // console.error("Error fetching recent sales:", err);
    return next(err)
}
   }

   async getSalesHistory(req: Request, res: Response,next:NextFunction) {
  try {
    const {authorId} = req.params;
        if (!authorId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));   

        const sales = await this.authorsaleshistoryusecase.execute(authorId);
    // console.log('~sales',sales);
    
    return res
        .status(StatusCode.OK)
        .json({ success: true, message: "author stats", sales  });
  } catch (err) {
    // console.error("Error fetching recent sales:", err);
    return next(err)
}
   }

}
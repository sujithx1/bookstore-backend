import { NextFunction, Request, Response } from "express";
import { ErrorCodes, StatusCode } from "../../../types/types";
import { GetallUsersusecase } from "../../../usecases/admin/findallusers";
import { ToogleuserActiveuseCase } from "../../../usecases/admin/deletuserbyid";
import { AppError } from "../../../config/AppError";
import { GetAllOrders } from "../../../usecases/checkout/getallorders";
import { GetAllBookbyadminusecase } from "../../../usecases/checkout/getallbooks";
import { GetAllSalesHistoryusecase } from "../../../usecases/admin/getallsaleshistory";

export class AdminController {
  constructor(private getusersusecase: GetallUsersusecase,
    private deleteuserusecase:ToogleuserActiveuseCase,
    private getallordersusecase:GetAllOrders,
    private getallbooksusecase:GetAllBookbyadminusecase,
    private getallsalesHistoriesusecase:GetAllSalesHistoryusecase,
  ) {}

  async getallusers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getusersusecase.execute();

      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "useres", users });
    } catch (error) {
      return next(error);
    }
  }


  async deleteuser(req:Request , res: Response, next: NextFunction) {
    try {
        const{userId,isActive}=req.params
        if(!userId||!isActive){
            return next(new AppError(ErrorCodes.validationError,StatusCode.BAD_REQUEST))
        }
      const users = await this.deleteuserusecase.execute(userId,isActive);

      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "useres", users });
    } catch (error) {
      return next(error);
    }
  }

  async getallorders(req:Request , res: Response, next: NextFunction) {
    try {
            const orders=await this.getallordersusecase.execute()
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "useres", orders });
    } catch (error) {
      return next(error);
    }
  }
  async getallbooks(req:Request , res: Response, next: NextFunction) {
    try {
            const books=await this.getallbooksusecase.execute()
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "useres", books });
    } catch (error) {
      return next(error);
    }
  }
  async salesHistory(req:Request , res: Response, next: NextFunction) {
    try {
            const sales=await this.getallsalesHistoriesusecase.execute()
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "useres", sales });
    } catch (error) {
      return next(error);
    }
  }
}

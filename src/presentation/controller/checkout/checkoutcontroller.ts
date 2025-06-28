import { NextFunction, Request, Response } from "express";
import { CheckoutPostuseCase } from "../../../usecases/checkout/checkoutusecase";
import { AppError } from "../../../config/AppError";
import { ErrorCodes, StatusCode } from "../../../types/types";
import { razorpay } from "../../../config/razorpay";

export class Checkoutcontrolle {
  constructor(private checkoutusecase: CheckoutPostuseCase) {}




  async checkoutpost(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId, userId, authorId, price, address,paymentmethod } = req.body;
      console.log(bookId,userId,address,authorId,price,paymentmethod);
      
      if (!bookId || !userId || !authorId || !price || !address ||!paymentmethod) {
        return next(
          new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
        );
      }
      const checkout = await this.checkoutusecase.execute(
        bookId,
        parseFloat(price),
        authorId,
        userId,
        address,
        paymentmethod
      );
      return res
        .status(StatusCode.CREATED)
        .json({ success: true, message: "Created", checkout });
    } catch (error) {
      return next(error);
    }
  }
  async create_orderRazorpay(req: Request, res: Response, next: NextFunction) {
    try {
       const { amount, currency = "INR", receipt } = req.body;

  const options = {
    amount: amount * 100, // amount in paisa
    currency,
    receipt: receipt || `rcpt-${Date.now()}`,
  };
      const order = await razorpay.orders.create(options);

      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "razorpay", order });
    } catch (error) {
      return next(error);
    }
  }


}

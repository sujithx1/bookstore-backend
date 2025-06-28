import { NextFunction, Request, Response } from "express";
import { AppError } from "../../config/AppError";

export const errorHandler = (
  err: AppError ,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.Statuscode).json({
      status: "error",
      error: err.message,
    });
  }

  console.error("Unhandled Error:", err);

  return res.status(500).json({
    status: "error",
    error: "Something went wrong on the server",
  });
};

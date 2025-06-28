export class AppError extends Error {
  public readonly Statuscode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statuscode = 500, isoperation = true) {
    super(message);
    this.Statuscode = statuscode;
    this.isOperational = isoperation;
    Error.captureStackTrace(this, this.constructor);
  }
}

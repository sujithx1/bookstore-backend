"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statuscode = 500, isoperation = true) {
        super(message);
        this.Statuscode = statuscode;
        this.isOperational = isoperation;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;

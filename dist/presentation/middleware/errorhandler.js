"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../config/AppError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
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
exports.errorHandler = errorHandler;

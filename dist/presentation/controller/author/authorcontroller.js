"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorController = void 0;
const types_1 = require("../../../types/types");
const AppError_1 = require("../../../config/AppError");
class AuthorController {
    constructor(authorstatsusecase, authorrecentsalesusecase, authorsaleshistoryusecase) {
        this.authorstatsusecase = authorstatsusecase;
        this.authorrecentsalesusecase = authorrecentsalesusecase;
        this.authorsaleshistoryusecase = authorsaleshistoryusecase;
    }
    getAuthStats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                if (!authorId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const authorstats = yield this.authorstatsusecase.execute(authorId);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "author stats", authorstats });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getRecentSalesController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                if (!authorId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const sales = yield this.authorrecentsalesusecase.execute(authorId);
                // console.log('~sales',sales);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "author stats", sales });
            }
            catch (err) {
                // console.error("Error fetching recent sales:", err);
                return next(err);
            }
        });
    }
    getSalesHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                if (!authorId)
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                const sales = yield this.authorsaleshistoryusecase.execute(authorId);
                // console.log('~sales',sales);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ success: true, message: "author stats", sales });
            }
            catch (err) {
                // console.error("Error fetching recent sales:", err);
                return next(err);
            }
        });
    }
}
exports.AuthorController = AuthorController;

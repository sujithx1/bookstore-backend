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
exports.BookController = void 0;
const AppError_1 = require("../../../config/AppError");
const types_1 = require("../../../types/types");
class BookController {
    constructor(bookcreateusecase, bookupdateusecase, bookdeleteusecase, bookgetbyauthorid, bookgetallbooksusecase, bookgetbyidusecase) {
        this.bookcreateusecase = bookcreateusecase;
        this.bookupdateusecase = bookupdateusecase;
        this.bookdeleteusecase = bookdeleteusecase;
        this.bookgetbyauthorid = bookgetbyauthorid;
        this.bookgetallbooksusecase = bookgetallbooksusecase;
        this.bookgetbyidusecase = bookgetbyidusecase;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, price, author, picture, status, authorname } = req.body;
                if (!title || !description || !price || !author || !picture || !status || !authorname) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.validationError, types_1.StatusCode.BAD_REQUEST));
                }
                const book = yield this.bookcreateusecase.execute(title, description, price, author, picture, status, authorname);
                return res
                    .status(types_1.StatusCode.CREATED)
                    .json({ message: "Book Created", success: true, book });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, price, picture, isActive } = req.body;
                const { id } = req.params;
                if (!id) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                }
                const book = yield this.bookupdateusecase.execute(id, title, description, price, picture, isActive);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ message: "Book Updated", success: true, book });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, isActive } = req.params;
                if (!id) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                }
                console.log(isActive);
                yield this.bookdeleteusecase.execute(id, isActive);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ message: "Book Blocked ", success: true });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getbooksbyAuthorId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                if (!authorId) {
                    return next(new AppError_1.AppError(types_1.ErrorCodes.missingId, types_1.StatusCode.BAD_REQUEST));
                }
                console.log(authorId);
                const books = yield this.bookgetbyauthorid.execute(authorId);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ message: "Books", success: true, books });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getallBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookgetallbooksusecase.execute();
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ message: "Books", success: true, books });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getbookbyid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield this.bookgetbyidusecase.execute(id);
                return res
                    .status(types_1.StatusCode.OK)
                    .json({ message: "Books", success: true, book });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.BookController = BookController;

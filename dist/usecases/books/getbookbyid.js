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
exports.BooksGetbyIduseCase = void 0;
const AppError_1 = require("../../config/AppError");
const types_1 = require("../../types/types");
class BooksGetbyIduseCase {
    constructor(bookrep) {
        this.bookrep = bookrep;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookrep.getBookById(id);
            if (!book)
                throw new AppError_1.AppError(types_1.ErrorCodes.resourceNotFound, types_1.StatusCode.BAD_REQUEST);
            return book;
        });
    }
}
exports.BooksGetbyIduseCase = BooksGetbyIduseCase;

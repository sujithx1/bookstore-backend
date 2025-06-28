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
exports.BookCreateUseCase = void 0;
class BookCreateUseCase {
    constructor(bookrep) {
        this.bookrep = bookrep;
    }
    execute(title, description, price, author, picture, status, authorname) {
        return __awaiter(this, void 0, void 0, function* () {
            const newbook = {
                id: '',
                bookId: `book-${Date.now().toString()}`,
                author: author,
                description: description,
                price: price,
                title: title,
                isActive: status == "draft" ? false : true,
                authorname: authorname,
                picture: picture
            };
            return yield this.bookrep.addBook(newbook);
        });
    }
}
exports.BookCreateUseCase = BookCreateUseCase;

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
exports.BookRepository = void 0;
const bookmodel_1 = require("../models/bookmodel");
const ReturnBook = (book) => ({
    id: book._id.toString(),
    bookId: book.bookId,
    author: book.author,
    title: book.title,
    description: book.description,
    picture: book.picture,
    price: book.price,
    authorname: book.authorname,
    isActive: book.isActive,
    sellCount: book.sellCount,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt
});
class BookRepository {
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const newBook = new bookmodel_1.BookModel({
                bookId: book.bookId,
                author: book.author,
                title: book.title,
                description: book.description,
                picture: book.picture,
                price: book.price,
                sellCount: (_a = book.sellCount) !== null && _a !== void 0 ? _a : 0
            });
            const savedBook = yield newBook.save();
            return ReturnBook(savedBook);
        });
    }
    deleteBook(id, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield bookmodel_1.BookModel.findByIdAndUpdate(id, { $set: {
                    isActive: !isActive
                } }, { upsert: true, new: true });
            if (!result)
                return null;
            return ReturnBook(result);
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield bookmodel_1.BookModel.find({ isActive: true });
            return books.map(ReturnBook);
        });
    }
    getAllBooksByAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield bookmodel_1.BookModel.find();
            return books.map(ReturnBook);
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield bookmodel_1.BookModel.findById(id);
            return book ? ReturnBook(book) : null;
        });
    }
    getBookByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield bookmodel_1.BookModel.findOne({ title });
            return book ? ReturnBook(book) : null;
        });
    }
    getBooksByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield bookmodel_1.BookModel.find({ author: authorId });
            return books.map(ReturnBook);
        });
    }
    updateBook(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield bookmodel_1.BookModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
            return updated ? ReturnBook(updated) : null;
        });
    }
}
exports.BookRepository = BookRepository;

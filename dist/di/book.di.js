"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookcontroller = void 0;
const bookrepositories_1 = require("../infrastructor/repositories/bookrepositories");
const bookcontroller_1 = require("../presentation/controller/book/bookcontroller");
const createBooks_1 = require("../usecases/books/createBooks");
const deletebooks_1 = require("../usecases/books/deletebooks");
const getallbooks_1 = require("../usecases/books/getallbooks");
const getbookbyid_1 = require("../usecases/books/getbookbyid");
const getbyauthorid_1 = require("../usecases/books/getbyauthorid");
const updatebooks_1 = require("../usecases/books/updatebooks");
const bookrepo = new bookrepositories_1.BookRepository();
const createbook = new createBooks_1.BookCreateUseCase(bookrepo);
const updatebook = new updatebooks_1.BookUpdateuseCase(bookrepo);
const deletebook = new deletebooks_1.BookDeleteuseCase(bookrepo);
const getbooksbyauthorid = new getbyauthorid_1.BooksGetbyAuthorid(bookrepo);
const getallbooks = new getallbooks_1.BooksGetall(bookrepo);
const bookgetbyId = new getbookbyid_1.BooksGetbyIduseCase(bookrepo);
exports.bookcontroller = new bookcontroller_1.BookController(createbook, updatebook, deletebook, getbooksbyauthorid, getallbooks, bookgetbyId);

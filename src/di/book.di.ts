import { BookRepository } from "../infrastructor/repositories/bookrepositories";
import { UserRepository } from "../infrastructor/repositories/userrepository";
import { BookController } from "../presentation/controller/book/bookcontroller";
import { BookCreateUseCase } from "../usecases/books/createBooks";
import { BookDeleteuseCase } from "../usecases/books/deletebooks";
import { BooksGetall } from "../usecases/books/getallbooks";
import { BooksGetbyIduseCase } from "../usecases/books/getbookbyid";
import { BooksGetbyAuthorid } from "../usecases/books/getbyauthorid";
import { BookUpdateuseCase } from "../usecases/books/updatebooks";

const bookrepo = new BookRepository();
const userrep=new UserRepository()



const createbook = new BookCreateUseCase(bookrepo,userrep);
const updatebook = new BookUpdateuseCase(bookrepo);
const deletebook = new BookDeleteuseCase(bookrepo);
const getbooksbyauthorid = new BooksGetbyAuthorid(bookrepo);
const getallbooks = new BooksGetall(bookrepo);
const bookgetbyId = new BooksGetbyIduseCase(bookrepo);
export const bookcontroller = new BookController(
  createbook,
  updatebook,
  deletebook,
  getbooksbyauthorid,
  getallbooks,
  bookgetbyId
);

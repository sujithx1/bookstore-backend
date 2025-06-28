import { BookRepository } from "../infrastructor/repositories/bookrepositories";
import { PurchaseRepository } from "../infrastructor/repositories/purchaserepository";
import { UserRepository } from "../infrastructor/repositories/userrepository";
import { AdminController } from "../presentation/controller/admin/admincontroller";
import { ToogleuserActiveuseCase } from "../usecases/admin/deletuserbyid";
import { GetallUsersusecase } from "../usecases/admin/findallusers";
import { GetAllSalesHistoryusecase } from "../usecases/admin/getallsaleshistory";
import { GetAllBookbyadminusecase } from "../usecases/checkout/getallbooks";
import { GetAllOrders } from "../usecases/checkout/getallorders";

const purchaseRep=new PurchaseRepository()
const bookRep=new BookRepository()
const userrepo=new UserRepository()
const getallusers=new GetallUsersusecase(userrepo)
const toogleblockuser=new ToogleuserActiveuseCase(userrepo)
const getallorders=new GetAllOrders(purchaseRep)
const getallbooksbyadmin=new GetAllBookbyadminusecase(bookRep)
const getallsaleshistory=new GetAllSalesHistoryusecase(purchaseRep)
export const admincontroller= new AdminController(getallusers,toogleblockuser,getallorders,getallbooksbyadmin,getallsaleshistory)
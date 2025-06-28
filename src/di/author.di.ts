import { PurchaseRepository } from "../infrastructor/repositories/purchaserepository";
import { UserRepository } from "../infrastructor/repositories/userrepository";
import { AuthorController } from "../presentation/controller/author/authorcontroller";
import { AuthorRecentSales } from "../usecases/author/authorrecentsalesusecase";
import { AuthorSalesHistory } from "../usecases/author/authorsalesHistory";
import { FetchAuthorStats } from "../usecases/author/authorStatsusecase";


const userrep=new UserRepository()
const purchaserep=new PurchaseRepository()

const authorstatsusecase=new FetchAuthorStats(purchaserep)
const authorresentsales=new AuthorRecentSales(purchaserep)
const authorsaleshistory=new AuthorSalesHistory(purchaserep)
export const authorcontroller=new AuthorController(authorstatsusecase,authorresentsales,authorsaleshistory)
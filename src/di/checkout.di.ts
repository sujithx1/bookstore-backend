import { BookRepository } from "../infrastructor/repositories/bookrepositories";
import { PurchaseRepository } from "../infrastructor/repositories/purchaserepository";
import { UserRepository } from "../infrastructor/repositories/userrepository";
import { Checkoutcontrolle } from "../presentation/controller/checkout/checkoutcontroller";
import { CheckoutPostuseCase } from "../usecases/checkout/checkoutusecase";


const userrep=new UserRepository()
const bookrep=new BookRepository()
const checkoutrepo=new PurchaseRepository()


const postchekout=new CheckoutPostuseCase(checkoutrepo,bookrep,userrep)


export const checkoutcontroller=new Checkoutcontrolle(postchekout)
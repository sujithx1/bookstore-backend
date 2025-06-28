import { io } from "../../app";
import { AppError } from "../../config/AppError";
import { PurchaseEntity } from "../../domain/entities/purchaseEntity";
import { Address_types } from "../../domain/entities/userEntity";
import { IBookRepository } from "../../domain/interfaces/IBookRep";
import { IPurchaseRepository } from "../../domain/interfaces/Ipurchaserepo";
import { IUserRepository } from "../../domain/interfaces/Iuserrep";
import { ErrorCodes, StatusCode } from "../../types/types";
import { sendPurchaseEmail } from "../../utils/email";

export class CheckoutPostuseCase {
  constructor(
    private checkoutrep: IPurchaseRepository,
    private bookrepo: IBookRepository,
    private userrep: IUserRepository
  ) {}

  async execute(
    bookId: string,
    price: number,
    authorId: string,
    userId: string,
    address: string,
    paymentmethod:"cod"|"razorpay"
  ): Promise<PurchaseEntity> {
    const book = await this.bookrepo.getBookById(bookId);

    if (!book){
      throw new AppError(ErrorCodes.resourceNotFound, StatusCode.NOT_FOUND);}
    const findauthor = await this.userrep.findById(authorId);

    if (!findauthor) {
      throw new AppError(ErrorCodes.userNotFound, StatusCode.NOT_FOUND);
    }
    const findadmin = await this.userrep.findAdmin();
    if (!findadmin) {
      throw new AppError(ErrorCodes.userNotFound, StatusCode.NOT_FOUND);
    }
    const finduser = await this.userrep.findById(userId);
    if (!finduser){
      throw new AppError(ErrorCodes.userNotFound, StatusCode.NOT_FOUND);
}
const useraddress=await this.userrep.findaddressbyid(finduser.id,address)
if(!useraddress)throw new AppError(ErrorCodes.userNotFound,StatusCode.NOT_FOUND)

    const data: PurchaseEntity = {
      id: "",
      address:useraddress,
      authorId,
      orderstatus:'pending',
       paymentmethod:paymentmethod,
       paymentstatus:"completed",
      bookId,
      price,
      purchaseDate: new Date(),
      purchaseId: `order-${Date.now()}`,
      userId,
    };

    const checkout = await this.checkoutrep.createPurchase(data);
    if (!checkout)
      throw new AppError(
        ErrorCodes.serverError,
        StatusCode.INTERNAL_SERVER_ERROR
      );

    book.sellCount = (book.sellCount || 0) + 1;

    const updatebook = await this.bookrepo.updateBook(bookId, book);
    if (!updatebook)
      throw new AppError(
        ErrorCodes.serverError,
        StatusCode.INTERNAL_SERVER_ERROR
      );
    const authorShare = price * 0.7;
    const adminShare = price - authorShare;

    findauthor.revenue = (findauthor.revenue || 0) + authorShare;
    findadmin.revenue = (findadmin.revenue || 0) + adminShare;

    await sendPurchaseEmail(
      findauthor.email,
      book.title,
      book.price,
      finduser.name,
      "AUTHOR"
    );
    await sendPurchaseEmail(
      findadmin.email,
      book.title,
      book.price,
      finduser.name,
      "ADMIN"
    );
    const message_data = {
      id: findauthor.id,
      price: price,
      book: book.title,
    };
    io.emit("purchased_message", message_data);

    return checkout;
  }
}
